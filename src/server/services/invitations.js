import { sendMail } from '../lib/email'
import Hashids from 'hashids'

export const sendInvitation = async (inviter, tourist) => {

  const hashids = new Hashids()

  const salt = Math.floor(Math.random() * Math.floor(999999999))

  const code = hashids.encode(salt, tourist.get('id'))

  await sendMail({
    template: 'invitation',
    data: {
      inviter: {
        full_name: inviter.get('full_name')
      },
      invitee: {
        first_name: tourist.related('user').get('first_name')
      },
      tour: {
        name: tourist.related('tour').get('name')
      },
      code
    },
    to: tourist.related('user').get('rfc822'),
    subject: `${inviter.get('full_name')} invited you to a tour`
  })

}
