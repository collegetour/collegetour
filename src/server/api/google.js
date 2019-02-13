import SessionSerializer from '../serializers/session_serializer'
import { google as googleapis } from 'googleapis'
import request from 'request-promise'
import User from '../models/user'
import express from 'express'
import moment from 'moment'
import path from 'path'

const redirect_uri = `${process.env.WEB_HOST}/signin/google/token`

const auth = new googleapis.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirect_uri)

const google = express()

google.set('views', path.join(__dirname, '..', 'views'))

google.set('view engine', 'ejs')

google.get('/signin/google', async (req, res) => {

  const auth_url = auth.generateAuthUrl({
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  })

  res.redirect(301, auth_url)

})

google.get('/signin/google/token', async (req, res) => {

  const data = await new Promise((resolve, reject) => {
    auth.getToken(req.query.code, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })

  res.redirect(301, `/signin/google/authorize?access_token=${data.access_token}`)

})

google.get('/signin/google/authorize', async (req, res) => {

  const createUser = async (user) => {

    // create asset #user.profile_picture
    const asset = { get: () => 1 }

    return await User.forge({
      first_name: user.first_name,
      last_name: user.last_name,
      photo_id: asset.get('id'),
      google_id: user.id,
      created_at: moment(),
      updated_at: moment()
    }).save()

  }

  const profile = await request({
    uri: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${req.query.access_token}`,
    json: true
  })

  const self = {
    id: profile.sub,
    first_name: profile.given_name,
    last_name: profile.family_name,
    profile_picture: profile.picture
  }

  const existing_user = await User.where({ google_id: self.id }).fetch()

  const user = existing_user || await createUser(self)

  await user.load(['photo'])

  return res.render('token', { user: SessionSerializer(user) })

})

export default google
