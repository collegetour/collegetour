import TouristSerializer from '../serializers/tourist_serializer'
import { sendInvitation } from '../services/invitations'
import Tourist from '../models/tourist'
import { Router } from 'express'
import { t } from '../utils'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/tourists', t(async (req, res, trx) => {

  const tourists = await Tourist.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    transacting: trx,
    withRelated: ['user.photo','tour']
  })

  res.status(200).json({
    data: tourists.map(TouristSerializer)
  })

}))

router.delete('/api/tours/:tour_id/tourists/:id', t(async (req, res, trx) => {

  const tourist = await Tourist.where({
    id: req.params.id
  }).fetch({
    transacting: trx
  })

  await tourist.destroy({ transacting: trx })

  res.status(200).json({
    data: true
  })

}))

router.post('/api/tours/:tour_id/tourists/:id/resend', t(async (req, res, trx) => {

  const tourist = await Tourist.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['user','tour']
  })

  await sendInvitation(req.user, tourist)

  res.status(200).json({
    data: true
  })

}))

export default router
