import { Router } from 'express'
import User from '../models/user'

const tours = new Router({ mergeParams: true })

tours.get('/api/session', async (req, res) => {

  const user = await User.where({
    id: 1
  }).fetch()

  res.status(200).json({
    data: {
      id: user.get('id'),
      first_name: user.get('first_name'),
      last_name: user.get('last_name'),
      photo: user.get('photo').get('url')
    }
  })

})

export default tours
