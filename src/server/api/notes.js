import ImpressionSerializer from '../serializers/impression_serializer'
import Impression from '../models/impression'
import { t } from '../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.post('/api/tours/:tour_id/visits/:visit_id/notes', t(async (req, res, trx) => {

  const impression = await Impression.forge({
    type: 'photo',
    visit_id: req.params.visit_id,
    user_id: req.user.get('id'),
    text: req.body.text
  }).save(null, {
    transacting: trx
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}))

export default router
