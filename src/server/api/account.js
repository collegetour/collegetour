import SessionSerializer from '../serializers/session_serializer'
import { t } from '../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.patch('/api/account', t(async (req, res, trx) => {

  await req.user.save(req.body, {
    transacting: trx,
    patch: true
  })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}))

export default router
