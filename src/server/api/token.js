import { withTransaction } from '../utils'
import { decode } from '../services/jwt'
import User from '../models/user'

const router = withTransaction(async (req, res, trx, next) => {

  const token = req.headers.authorization

  if(!token) throw new Error('No token ')

  const matches = token.match(/Bearer (.*)/)

  if(!matches) throw new Error('Invalid token')

  const { exp, user_id } = decode(matches[1])

  const iat = Math.floor(Date.now() / 1000)

  if(iat > exp) throw new Error('Expired token')

  const user = await User.where({
    id: user_id
  }).fetch({
    transacting: trx,
    withRelated: ['photo']
  })

  if(!user) throw new Error('Invalid user')

  req.user = user

  next()

})

export default router
