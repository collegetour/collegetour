import htmlToText from 'html-email-to-text'
import inline from 'inline-css'
import moment from 'moment'
import path from 'path'
import ses from './ses'
import ejs from 'ejs'
import fs from 'fs'

export const sendMail = async (email) => {

  const emailPath = path.join(__dirname, '..', 'emails')

  const templates = {
    content: fs.readFileSync(path.join(emailPath, `${email.template}.ejs`), 'utf8'),
    envelope: fs.readFileSync(path.join(emailPath, 'envelope.ejs'), 'utf8')
  }

  const data = {
    ...email.data,
    web_host: process.env.WEB_HOST
  }

  const content = ejs.render(templates.content, data)

  const rendered = ejs.render(templates.envelope, { ...data, content})

  const html = await inline(rendered, {
    url: process.env.WEB_HOST,
    removeStyleTags: false
  })

  const message = {
    ...email,
    from: 'College Tourist <noreply@collegetouristapp.com>',
    to: process.env.EMAIL_REDIRECT || email.to,
    html,
    text: htmlToText(html)
  }

  try {

    if(process.env.EMAIL_DELIVERY === 'console') return await _sendViaConsole(message)

    if(process.env.EMAIL_DELIVERY === 'ses') return await _sendViaSES(message)

  } catch(err) {

    console.log(err)

    return { error: err.message }

  }

}

const _sendViaConsole = async (message) => {

  const output = [
    Array(86).join('-'),
    `TO: ${message.to}`,
    `SUBJECT: ${message.subject}`,
    Array(86).join('-'),
    message.text,
    Array(86).join('-')
  ]

  console.mail(output.join('\n'))

  return { sent_at: moment() }

}

const _sendViaSES = async (message) => {

  const result = await ses.sendEmail({
    Destination: {
      ToAddresses: [ message.to ]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: message.html
        },
        Text: {
          Charset: 'UTF-8',
          Data: message.text
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: message.subject
      }
    },
    Source: message.from
  }).promise()

  return {
    ses_id: result.MessageId,
    sent_at: moment()
  }

}
