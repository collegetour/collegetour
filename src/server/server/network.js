import SessionSerializer from '../serializers/session_serializer'
import { createAssetFromUrl } from '../services/assets'
import Tourist from '../models/tourist'
import User from '../models/user'
import Hashids from 'hashids'
import express from 'express'
import { t } from '../utils'
import moment from 'moment'

const network = (network, getUrl, getAccessToken, getUser) => {

  const router = express()

  router.get('/', t(async (req, res, trx) => {

    const state = encodeState(req.query)

    const data = await getUrl(state)

    res.status(200).json({ data })

  }))

  router.get('/token', t(async (req, res, trx) => {

    const access_token = await getAccessToken(req.query.code)

    const url = `${process.env.API_HOST}/${network}/authorize?access_token=${access_token}&state=${req.query.state}`

    res.redirect(301, url)

  }))

  router.get('/authorize', t(async (req, res, trx) => {

    const findTourist = async (self, tourist_id, trx) => {

      if(!tourist_id) return null

      const hashids = new Hashids()

      const values = hashids.decode(tourist_id)

      const tourist = await Tourist.where({
        id: values[1]
      }).fetch({
        transacting: trx,
        withRelated: ['user']
      })

      if(!tourist) return null

      tourist.save({
        claimed_at: moment()
      }, {
        transacting: trx,
        patch: true
      })

      const photo_id = tourist.related('user').get('photo_id')

      const asset = photo_id === null ? await createAssetFromUrl(self.profile_picture, trx) : null

      await tourist.related('user').save({
        photo_id: asset ? asset.get('id') : photo_id,
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

    const createUser = async (self, trx) => {

      const asset = await createAssetFromUrl(self.profile_picture, trx)

      return await User.forge({
        first_name: self.first_name,
        last_name: self.last_name,
        photo_id: asset.get('id'),
        [`${network}_id`]: self.id,
        agreed_to_terms: false,
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

    const protocol = state.host === 'cordova' ? 'collegetourist://' : `${process.env.WEB_HOST}/`

    res.redirect(301, `${protocol}?token=${session.token}&redirect=${redirect}`)

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

export default network
