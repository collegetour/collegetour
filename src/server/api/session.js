import SessionSerializer from '../serializers/session_serializer'
import { withTransaction } from '../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/session', withTransaction(async (req, res, trx) => {

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}))

export default router
