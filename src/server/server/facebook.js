import { Facebook } from 'fb'
import signin from './signin'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const redirect_uri = `${process.env.WEB_HOST}/signin/facebook/token`

const getUrl = async (state) => await fb.getLoginUrl({
  state,
  redirect_uri
})

const getAccessToken = async (code) => {

  const data = await fb.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri,
    code
  })

  return data.access_token

}

const getUser = async (access_token) => {

  fb.setAccessToken(access_token)

  const self = await fb.api('/me', { fields: ['id','first_name','last_name','picture'] })

  return {
    id: self.id,
    first_name: self.first_name,
    last_name: self.last_name,
    profile_picture: self.picture.data.url
  }

}

const facbook = signin('facebook', getUrl, getAccessToken, getUser)

export default facbook