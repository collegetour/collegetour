import SessionSerializer from '../serializers/session_serializer'
import { t } from '../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/session', t(async (req, res, trx) => {

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}))

export default router
