import SessionSerializer from '../serializers/session_serializer'
import Instagram from 'instagram-node'
import User from '../models/user'
import express from 'express'
import moment from 'moment'
import path from 'path'

const redirect_uri = `${process.env.WEB_HOST}/signin/instagram/token`

const ig = new Instagram.instagram()

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

const router = express()

router.set('views', path.join(__dirname, '..', 'views'))

router.set('view engine', 'ejs')

router.get('/signin/instagram', async (req, res) => {

  const authorization_url = await ig.get_authorization_url(redirect_uri, {
    scope: 'basic'
  })

  res.redirect(301, authorization_url)

})

router.get('/signin/instagram/token', async (req, res) => {

  const data = await Promise.promisify(ig.authorize_user)(req.query.code, redirect_uri)

  res.redirect(301, `/signin/instagram/authorize?access_token=${data.access_token}`)

})

router.get('/signin/instagram/authorize', async (req, res) => {

  const createUser = async (user) => {

    const parts = user.full_name.split(' ')

    // create asset #user.profile_picture
    const asset = { get: () => 1 }

    return await User.forge({
      first_name: parts[0],
      last_name: parts[parts.length - 1],
      photo: asset.get('id'),
      instagram_id: user.id,
      created_at: moment(),
      updated_at: moment()
    }).save()

  }

  ig.use({ access_token: req.query.access_token })

  const self = await Promise.promisify(ig.user)('self')

  const existing_user = await User.where({
    instagram_id: self.id
  }).fetch()

  const user = existing_user || await createUser(self)

  await user.load(['photo'])

  return res.render('token', {
    user: SessionSerializer(user)
  })

})

export default router
