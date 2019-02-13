import TourSerializer from '../serializers/tour_serializer'
import Tour from '../models/tour'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours', async (req, res) => {

  const tours = await Tour.query(qb => {

    qb.innerJoin('travelers', 'travelers.tour_id', 'tours.id')

    qb.where('travelers.user_id', req.user.get('id'))

  }).fetchAll()

  res.status(200).json({
    data: tours.map(TourSerializer)
  })

})

router.get('/api/tours/:id', async (req, res) => {

  const tour = await Tour.where({
    id: req.params.id
  }).fetch()

  res.status(200).json({
    data: TourSerializer(tour)
  })

})

export default router
