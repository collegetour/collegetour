import { decode } from '../lib/jwt'
import User from '../models/user'

const router = async (req, res, next) => {

  const token = req.headers.authorization

  if(!token) return res.status(401).json({
    message: 'No token'
  })

  const matches = token.match(/Bearer (.*)/)

  if(!matches) return res.status(401).json({
    message: 'Invalid token'
  })

  const { exp, user_id } = decode(matches[1])

  const iat = Math.floor(Date.now() / 1000)

  if(iat > exp) return res.status(401).json({
    message: 'Expired token'
  })

  const user = await User.where({
    id: user_id
  }).fetch({
    transacting: req.trx,
    withRelated: ['photo']
  })

  if(!user) return res.status(401).json({
    message: 'Invalid user'
  })

  req.user = user

  next()

}

export default router
