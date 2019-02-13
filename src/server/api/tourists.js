import TouristSerializer from '../serializers/tourist_serializer'
import Tourist from '../models/tourist'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/tourists', async (req, res) => {

  const tourists = await Tourist.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    withRelated: ['user.photo']
  })

  res.status(200).json({
    data: tourists.map(TouristSerializer)
  })

})

export default router
