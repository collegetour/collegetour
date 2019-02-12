import SessionSerializer from '../serializers/session_serializer'
import { Router } from 'express'

const tours = new Router({ mergeParams: true })

tours.get('/api/session', async (req, res) => {

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

})

export default tours
