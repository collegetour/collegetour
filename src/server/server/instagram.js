import Instagram from 'instagram-node'
import signin from './signin'

const redirect_uri = `${process.env.API_HOST}/signin/instagram/token`

const ig = new Instagram.instagram()

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

const getUrl = async (state) => {

  return await ig.get_authorization_url(redirect_uri, {
    state,
    scope: 'basic'
  })

}

const getAccessToken = async (code) => {

  const data = await Promise.promisify(ig.authorize_user)(code, redirect_uri)

  return data.access_token

}

const getUser = async (access_token) => {

  ig.use({ access_token })

  const self = await Promise.promisify(ig.user)('self')

  const parts = self.full_name.split(' ')

  return {
    id: self.id,
    first_name: parts[0],
    last_name: parts[parts.length - 1],
    profile_picture: self.profile_picture
  }

}

const instagram = signin('instagram', getUrl, getAccessToken, getUser)

export default instagram
