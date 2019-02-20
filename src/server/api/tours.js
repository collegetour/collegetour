import TourSerializer from '../serializers/tour_serializer'
import Tourist from '../models/tourist'
import Tour from '../models/tour'
import { Router } from 'express'
import { t } from '../utils'
import moment from 'moment'

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

router.post('/api/tours', t(async (req, res, trx) => {

  const tour = await Tour.forge({
    name: req.body.name,
    origin: req.body.origin,
    destination: req.body.destination,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  }).save(null, {
    transacting: trx
  })

  await Tourist.forge({
    tour_id: tour.get('id'),
    user_id: req.user.get('id'),
    claimed_at: moment()
  }).save(null, {
    transacting: trx
  })

  res.status(200).json({
    data: TourSerializer(tour)
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
