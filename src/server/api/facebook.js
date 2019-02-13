import SessionSerializer from '../serializers/session_serializer'
import User from '../models/user'
import { Facebook } from 'fb'
import express from 'express'
import moment from 'moment'
import path from 'path'

const redirect_uri = `${process.env.WEB_HOST}/signin/facebook/token`

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const router = express()

router.set('views', path.join(__dirname, '..', 'views'))

router.set('view engine', 'ejs')

router.get('/signin/facebook', async (req, res) => {

  const login_url = await fb.getLoginUrl({
    redirect_uri
  })

  res.redirect(301, login_url)

})

router.get('/signin/facebook/token', async (req, res) => {

  const data = await fb.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri,
    code: req.query.code
  })

  res.redirect(301, `/signin/facebook/authorize?access_token=${data.access_token}`)

})

router.get('/signin/facebook/authorize', async (req, res) => {

  const createUser = async (user) => {

    // create asset #user.profile_picture
    const asset = { get: () => 1 }

    return await User.forge({
      first_name: user.first_name,
      last_name: user.last_name,
      photo_id: asset.get('id'),
      facebook_id: user.id,
      created_at: moment(),
      updated_at: moment()
    }).save()

  }

  fb.setAccessToken(req.query.access_token)

  const self = await fb.api('/me', { fields: ['id','first_name','last_name','picture'] })

  const existing_user = await User.where({
    facebook_id: self.id
  }).fetch()

  const user = existing_user || await createUser(self)

  await user.load(['photo'])

  return res.render('token', {
    user: SessionSerializer(user)
  })

})

export default router
