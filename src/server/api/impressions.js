import ImpressionSerializer from '../serializers/impression_serializer'
import Impression from '../models/impression'
import { t } from '../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/visits/:visit_id/impressions', t(async (req, res, trx) => {

  const impressions = await Impression.query(qb => {

    qb.where('visit_id', req.params.visit_id)

    qb.orderBy('created_at', 'desc')

  }).fetchAll({
    transacting: trx,
    withRelated: ['asset', 'user.photo']
  })

  res.status(200).json({
    data: impressions.map(ImpressionSerializer)
  })

}))

router.get('/api/tours/:tour_id/visits/:visit_id/impressions/:id', t(async (req, res, trx) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['asset', 'user.photo', 'visit.college']
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}))

router.patch('/api/tours/:tour_id/visits/:visit_id/impressions/:id', t(async (req, res, trx) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['asset', 'user.photo']
  })

  await impression.save({
    text: req.body.text
  }, {
    patch: true,
    transacting: trx
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}))

router.delete('/api/tours/:tour_id/visits/:visit_id/impressions/:id', t(async (req, res, trx) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: trx
  })

  await impression.destroy({
    transacting: trx
  })

  res.status(200).json({
    data: null
  })

}))

export default router
