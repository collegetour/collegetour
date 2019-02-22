import SessionSerializer from '../serializers/session_serializer'
import { createAssetFromUrl } from '../services/assets'
import Tourist from '../models/tourist'
import User from '../models/user'
import express from 'express'
import moment from 'moment'
import { t } from '../utils'

const signin = (network, getUrl, getAccessToken, getUser) => {

  const router = express()

  router.get(`/api/signin/${network}`, t(async (req, res, trx) => {

    const state = encodeState(req.query)

    const data = await getUrl(state)

    res.status(200).json({ data })

  }))

  router.get(`/signin/${network}/token`, t(async (req, res, trx) => {

    const access_token = await getAccessToken(req.query.code)

    const url = `${process.env.API_HOST}/signin/${network}/authorize?access_token=${access_token}&state=${req.query.state}`

    res.redirect(301, url)

  }))

  router.get(`/signin/${network}/authorize`, t(async (req, res, trx) => {

    const findTourist = async (self, tourist_id, trx) => {

      if(!tourist_id) return null

      const tourist = await Tourist.where({
        id: tourist_id
      }).fetch({
        transacting: trx,
        withRelated: ['user']
      })

      if(!tourist) return null

      await tourist.related('user').save({
        [`${network}_id`]: self.id
      }, {
        transacting: trx,
        patch: true
      })

      return tourist.related('user')

    }

    const findUser = async (self, trx) => await User.where({
      [`${network}_id`]: self.id
    }).fetch({
      transacting: trx
    })

    const createUser = async (user, trx) => {

      const asset = await createAssetFromUrl(user.profile_picture, trx)

      return await User.forge({
        first_name: user.first_name,
        last_name: user.last_name,
        photo_id: asset.get('id'),
        [`${network}_id`]: user.id,
        created_at: moment(),
        updated_at: moment()
      }).save(null, {
        transacting: trx
      })

    }

    const state = decodeState(req.query.state)

    const self = await getUser(req.query.access_token)

    const user = await findTourist(self, state.tourist_id, trx) || await findUser(self, trx) || await createUser(self, trx)

    await user.load(['photo'], { transacting: trx })

    const session = SessionSerializer(user)

    const redirect = state.redirect || '/'

    const query = [
      `id=${session.id}`,
      `full_name=${session.full_name}`,
      `photo=${session.photo}`,
      `token=${session.token}`,
      `redirect=${redirect}`
    ]

    const protocol = state.host === 'cordova' ? 'collegetourist://' : `${process.env.WEB_HOST}/`

    res.redirect(301, `${protocol}signin.html?${query.join('&')}`)

  }))

  return router

}

const encodeState = (state) => Object.keys(state).reduce((encoded, key) => [
  ...encoded,
  `${key}:${state[key]}`
], []).join('|')

const decodeState = (state) => state.split('|').reduce((decoded, pair) => {
  const parts = pair.split(':')
  return {
    ...decoded,
    [parts[0]]: parts[1]
  }
}, {})

export default signin
