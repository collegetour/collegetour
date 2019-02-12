import express from 'express'
import { Facebook } from 'fb'
import path from 'path'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const facebook = express()

facebook.set('views', path.join(__dirname, '..', 'views'))

facebook.set('view engine', 'ejs')

facebook.get('/signin/facebook', async (req, res) => {

  const response = await fb.getLoginUrl({
    scope: 'user_photos',
    redirect_uri: `${process.env.WEB_HOST}/signin/facebook/token`,
    state: req.user.get('id')
  })

  return response

})

facebook.get('/signin/facebook/token', async (req, res) => {

  const data = await fb.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: `${process.env.WEB_HOST}/signin/facebook/authorize`,
    code: req.query.code
  })

  return data

})

facebook.get('/signin/facebook/authorize', async (req, res) => {

  res.render('token')

})

export default facebook
