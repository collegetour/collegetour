import TouristSerializer from '../serializers/tourist_serializer'
import { withTransaction } from '../utils'
import Tourist from '../models/tourist'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/tourists', withTransaction(async (req, res, trx) => {

  const tourists = await Tourist.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    transacting: trx,
    withRelated: ['user.photo']
  })

  res.status(200).json({
    data: tourists.map(TouristSerializer)
  })

}))

export default router
