import TourSerializer from '../serializers/tour_serializer'
import { t } from '../utils'
import Tour from '../models/tour'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours', t(async (req, res, trx) => {

  const tours = await Tour.query(qb => {

    qb.innerJoin('tourists', 'tourists.tour_id', 'tours.id')

    qb.where('tourists.user_id', req.user.get('id'))

  }).fetchAll({
    transacting: trx
  })

  res.status(200).json({
    data: tours.map(TourSerializer)
  })

}))

router.get('/api/tours/:id', t(async (req, res, trx) => {

  const tour = await Tour.where({
    id: req.params.id
  }).fetch({
    transacting: trx
  })

  res.status(200).json({
    data: TourSerializer(tour)
  })

}))

export default router
