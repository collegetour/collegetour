import ImpressionSerializer from '../serializers/impression_serializer'
import Impression from '../models/impression'
import { Router } from 'express'

const impressions = new Router({ mergeParams: true })

impressions.get('/api/tours/:tour_id/visits/:visit_id/impressions', async (req, res) => {

  const impressions = await Impression.query(qb => {

    qb.where('visit_id', req.params.visit_id)

    qb.orderBy('created_at', 'desc')

  }).fetchAll({
    withRelated: ['asset', 'user.photo']
  })

  res.status(200).json({
    data: impressions.map(ImpressionSerializer)
  })

})

impressions.get('/api/tours/:tour_id/visits/:visit_id/impressions/:id', async (req, res) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    withRelated: ['asset', 'user.photo']
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

})

export default impressions
