import UserSerializer from '../serializers/user_serializer'
import { sendMail } from '../lib/email'
import { t } from '../utils'
import Tourist from '../models/tourist'
import User from '../models/user'
import Tour from '../models/tour'
import { Router } from 'express'
import Hashids from 'hashids'
import moment from 'moment'

const router = new Router({ mergeParams: true })

router.post('/api/tours/:id/invitations', t(async (req, res, trx) => {

  const tour = await Tour.where({
    id: req.params.id
  }).fetch({
    transacting: trx
  })

  const user = await User.forge({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    created_at: moment(),
    updated_at: moment()
  }).save(null, {
    transacting: trx
  })

  const tourist = await Tourist.forge({
    tour_id: tour.get('id'),
    user_id: user.get('id'),
    created_at: moment(),
    updated_at: moment()
  }).save(null, {
    transacting: trx
  })

  const hashids = new Hashids()

  const salt = Math.floor(Math.random() * Math.floor(999999999))

  const code = hashids.encode(salt, tourist.get('id'))

  await sendMail({
    template: 'invitation',
    data: {
      invitee: {
        first_name: user.get('first_name')
      },
      inviter: {
        full_name: req.user.get('full_name')
      },
      tour: {
        name: tour.get('name')
      },
      code
    },
    to: user.get('rfc822'),
    subject: `${req.user.get('full_name')} invited you to a tour`
  })

  const data = UserSerializer(user)

  res.status(200).json({ data })

}))

export default router
