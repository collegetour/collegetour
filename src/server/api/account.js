import SessionSerializer from '../serializers/session_serializer'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.patch('/api/account', async (req, res) => {

  await req.user.save(req.body, { patch: true })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

})

export default router
