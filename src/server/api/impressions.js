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

router.post('/api/tours/:tour_id/visits/:visit_id/impressions', t(async (req, res, trx) => {

  const impression = await Impression.forge({
    type: 'image',
    visit_id: req.params.visit_id,
    user_id: req.user.get('id'),
    asset_id: req.body.asset_id,
    caption: req.body.caption
  }).save(null, {
    transacting: trx
  })

  await impression.load(['asset', 'user.photo'])

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}))

router.get('/api/tours/:tour_id/visits/:visit_id/impressions/:id', t(async (req, res, trx) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['asset', 'user.photo']
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}))

export default router
