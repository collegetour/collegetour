import { Router } from 'express'
import { sendMail } from '../services/email'

const server = new Router({ mergeParams: true })

server.get('/foo', async (req, res) => {

  const result = await sendMail({
    template: 'invitation',
    data: {
      invitee: {
        first_name: 'Elinor'
      },
      inviter: {
        full_name: 'Greg Kops'
      },
      tour: {
        name: 'Winter Break Tour'
      },
      token: 'abc'
    },
    to: 'mochini@gmail.com',
    subject: 'Greg Kops invited you to a tour'
  })

  res.json(result)

})

export default server
