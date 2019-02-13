import { google as googleapis } from 'googleapis'
import request from 'request-promise'
import signin from './signin'

const redirect_uri = `${process.env.WEB_HOST}/signin/google/token`

const auth = new googleapis.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirect_uri)

const getUrl = async (state) => auth.generateAuthUrl({
  state,
  prompt: 'consent',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
})

const getAccessToken = async (code) => {

  const data = await new Promise((resolve, reject) => {
    auth.getToken(code, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })

  return data.access_token
}

const getUser = async (access_token) => {

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

}

const google = signin('google', getUrl, getAccessToken, getUser)

export default google
