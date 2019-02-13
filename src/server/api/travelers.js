import TravelerSerializer from '../serializers/traveler_serializer'
import Traveler from '../models/traveler'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/travelers', async (req, res) => {

  const travelers = await Traveler.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    withRelated: ['user.photo']
  })

  res.status(200).json({
    data: travelers.map(TravelerSerializer)
  })

})

export default router
