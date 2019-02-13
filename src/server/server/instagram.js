import Instagram from 'instagram-node'
import authorize from './authorize'
import express from 'express'
import path from 'path'
import qs from 'qs'

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
    state: qs.stringify(req.query).split('&').join('|'),
    scope: 'basic'
  })

  res.redirect(301, authorization_url)

})

router.get('/signin/instagram/token', async (req, res) => {

  const data = await Promise.promisify(ig.authorize_user)(req.query.code, redirect_uri)

  res.redirect(301, `/signin/instagram/authorize?access_token=${data.access_token}&state=${req.query.state}`)

})

router.get('/signin/instagram/authorize', authorize('instagram', async (access_token) => {

  ig.use({ access_token })

  const self = await Promise.promisify(ig.user)('self')

  const parts = self.full_name.split(' ')

  return {
    id: self.id,
    first_name: parts[0],
    last_name: parts[parts.length - 1],
    profile_picture: self.profile_picture
  }

}))

export default router
