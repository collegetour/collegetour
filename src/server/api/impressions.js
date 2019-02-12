import { Router } from 'express'
import Impression from '../models/impression'

const impressions = new Router({ mergeParams: true })

impressions.get('/api/tours/:tour_id/visits/:visit_id/impressions', async (req, res) => {

  const impressions = await Impression.query(qb => {

    qb.where('visit_id', req.params.visit_id)

    qb.orderBy('created_at', 'desc')

  }).fetchAll({
    withRelated: ['asset', 'user.photo']
  })

  res.status(200).json({
    data: impressions.map(impression => ({
      id: impression.get('id'),
      asset: impression.related('asset').get('url'),
      type: impression.get('type'),
      user: {
        id: impression.related('user').get('id'),
        full_name: impression.related('user').get('full_name'),
        photo: impression.related('user').related('photo').get('url')
      },
      created_at: impression.get('created_at'),
      updated_at: impression.get('updated_at')
    }))
  })

})

impressions.get('/api/tours/:tour_id/visits/:visit_id/impressions/:id', async (req, res) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    withRelated: ['asset', 'user.photo']
  })

  res.status(200).json({
    data: {
      id: impression.get('id'),
      asset: impression.related('asset').get('url'),
      type: impression.get('type'),
      user: {
        id: impression.related('user').get('id'),
        full_name: impression.related('user').get('full_name'),
        photo: impression.related('user').related('photo').get('url')
      },
      created_at: impression.get('created_at'),
      updated_at: impression.get('updated_at')
    }
  })

})

export default impressions
