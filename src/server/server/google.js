import { google as googleapis } from 'googleapis'
import request from 'request-promise'
import authorize from './authorize'
import express from 'express'
import path from 'path'
import qs from 'qs'

const redirect_uri = `${process.env.WEB_HOST}/signin/google/token`

const auth = new googleapis.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirect_uri)

const router = express()

router.set('views', path.join(__dirname, '..', 'views'))

router.set('view engine', 'ejs')

router.get('/signin/google', async (req, res) => {

  const auth_url = auth.generateAuthUrl({
    state: qs.stringify(req.query).split('&').join('|'),
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  })

  res.redirect(301, auth_url)

})

router.get('/signin/google/token', async (req, res) => {

  const data = await new Promise((resolve, reject) => {
    auth.getToken(req.query.code, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })

  res.redirect(301, `/signin/google/authorize?access_token=${data.access_token}&state=${req.query.state}`)

})

router.get('/signin/google/authorize', authorize('google', async (access_token) => {

  const profile = await request({
    uri: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    json: true
  })

  return {
    id: profile.sub,
    first_name: profile.given_name,
    last_name: profile.family_name,
    profile_picture: profile.picture
  }

}))

export default router
