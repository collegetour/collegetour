import { encode } from '../services/jwt'
import { Router } from 'express'

const tours = new Router({ mergeParams: true })

tours.get('/api/session', async (req, res) => {

  res.status(200).json({
    data: {
      id: req.user.get('id'),
      full_name: req.user.get('full_name'),
      photo: req.user.related('photo').get('url'),
      token: encode(req.user.get('id'))
    }
  })

})

export default tours
