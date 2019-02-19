import { t } from '../utils'
import { decode } from '../lib/jwt'
import User from '../models/user'

const router = t(async (req, res, trx, next) => {

  const token = req.headers.authorization

  if(!token) throw new Error('No token ')

  const matches = token.match(/Bearer (.*)/)

  if(!matches) throw new Error('Invalid token')

  const { exp, user_id } = decode(matches[1])

  const iat = Math.floor(Date.now() / 1000)

  if(iat > exp) throw new Error('Expired token')

  console.log('user_id', user_id)

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
