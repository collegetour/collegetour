import { encode } from '../services/jwt'
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

const instagram = express()

instagram.set('views', path.join(__dirname, '..', 'views'))

instagram.set('view engine', 'ejs')

instagram.get('/signin/instagram', async (req, res) => {

  const authorization_url = await ig.get_authorization_url(redirect_uri, {
    scope: 'basic'
  })

  res.redirect(301, authorization_url)

})

instagram.get('/signin/instagram/token', async (req, res) => {

  const data = await Promise.promisify(ig.authorize_user)(req.query.code, redirect_uri)

  res.redirect(301, `/signin/instagram/authorize?access_token=${data.access_token}`)

})

instagram.get('/signin/instagram/authorize', async (req, res) => {

  const createUser = async (user) => {

    const parts = user.full_name.split(' ')

    // create asset #user.profile_picture
    const asset = { get: () => 1 }

    return await User.forge({
      first_name: parts[0],
      last_name: parts[parts.length - 1],
      photo: asset.get('id'),
      instagram_access_token: req.query.access_token ,
      created_at: moment(),
      updated_at: moment()
    })

  }

  ig.use({ access_token: req.query.access_token })

  const self = await Promise.promisify(ig.user)('self')

  const existing_user = await User.where({
    instagram_access_token: req.query.access_token
  }).fetch()

  const user = existing_user || await createUser(self)

  await user.load(['photo'])

  const token = encode(user.get('id'))

  return res.render('token', {
    token,
    user: {
      id: user.get('id'),
      full_name: user.get('full_name'),
      photo: user.related('photo').get('url')
    }
  })

})

export default instagram
