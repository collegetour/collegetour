import UserSerializer from '../serializers/user_serializer'
import { sendMail } from '../services/email'
import { encode } from '../services/jwt'
import Traveler from '../models/traveler'
import User from '../models/user'
import Tour from '../models/tour'
import { Router } from 'express'
import moment from 'moment'

const router = new Router({ mergeParams: true })

router.post('/api/tours/:id/invitations', async (req, res) => {

  const data = await Promise.mapSeries(req.body.invitations, async (invitation) => {

    const tour = await Tour.where({
      id: req.params.id
    }).fetch()

    const user = await User.forge({
      first_name: invitation.first_name,
      last_name: invitation.last_name,
      email: invitation.email,
      created_at: moment(),
      updated_at: moment()
    }).save()

    const traveler = await Traveler.forge({
      tour_id: tour.get('id'),
      user_id: user.get('id'),
      created_at: moment(),
      updated_at: moment()
    }).save()

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
        token: encode('')
      },
      to: user.get('rfc822'),
      subject: `${req.user.get('full_name')} invited you to a tour`
    })

    return UserSerializer(user)

  })

  res.status(200).json({ data })

})

export default router
