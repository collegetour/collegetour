import authorize from './authorize'
import { Facebook } from 'fb'
import express from 'express'
import path from 'path'
import qs from 'qs'

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
    state: qs.stringify(req.query).split('&').join('|'),
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

  res.redirect(301, `/signin/facebook/authorize?access_token=${data.access_token}&state=${req.query.state}`)

})


router.get('/signin/facebook/authorize', authorize('facebook', async (access_token) => {

  fb.setAccessToken(access_token)

  const self = await fb.api('/me', { fields: ['id','first_name','last_name','picture'] })

  return {
    id: self.id,
    first_name: self.first_name,
    last_name: self.last_name,
    profile_picture: self.picture.data.url
  }

}))

export default router
