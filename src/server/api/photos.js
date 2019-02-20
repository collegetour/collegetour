import ImpressionSerializer from '../serializers/impression_serializer'
import Impression from '../models/impression'
import { t } from '../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.post('/api/tours/:tour_id/visits/:visit_id/photos', t(async (req, res, trx) => {

  const impressions = await Promise.map(req.body.impressions, async (data) => {

    const impression = await Impression.forge({
      type: 'photo',
      visit_id: req.params.visit_id,
      user_id: req.user.get('id'),
      asset_id: data.asset_id,
      text: data.text
    }).save(null, {
      transacting: trx
    })

    await impression.load(['asset', 'user.photo'])

    return ImpressionSerializer(impression)

  })

  res.status(200).json({
    data: impressions
  })

}))

export default router
