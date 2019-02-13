import SessionSerializer from '../serializers/session_serializer'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/session', async (req, res) => {

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

})

export default router
