import VisitSerializer from '../serializers/visit_serializer'
import { t } from '../utils'
import Visit from '../models/visit'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/visits', t(async (req, res, trx) => {

  const visits = await Visit.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    transacting: trx,
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: visits.map(VisitSerializer)
  })

}))

router.get('/api/tours/:tour_id/visits/:id', t(async (req, res, trx) => {

  const visit = await Visit.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: VisitSerializer(visit)
  })

}))

export default router
