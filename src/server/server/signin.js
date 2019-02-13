import SessionSerializer from '../serializers/session_serializer'
import { t } from '../utils'
import Tourist from '../models/tourist'
import User from '../models/user'
import express from 'express'
import moment from 'moment'
import path from 'path'

const signin = (network, getUrl, getAccessToken, getUser) => {

  const router = express()

  router.set('views', path.join(__dirname, '..', 'views'))

  router.set('view engine', 'ejs')

  router.get(`/signin/${network}`, t(async (req, res, trx) => {

    const state = Object.keys(req.query).reduce((state, key) => [
      ...state,
      `${key}:${req.query[key]}`
    ], []).join('|')

    const login_url = await getUrl(state)

    res.redirect(301, login_url)

  }))

  router.get(`/signin/${network}/token`, t(async (req, res, trx) => {

    const access_token = await getAccessToken(req.query.code)

    res.redirect(301, `/signin/${network}/authorize?access_token=${access_token}&state=${req.query.state}`)

  }))


  router.get(`/signin/${network}/authorize`, t(async (req, res, trx) => {

    const findTourist = async (self, tourist_id) => {

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

    const findUser = async (self) => await User.where({
      [`${network}_id`]: self.id
    }).fetch({
      transacting: trx
    })

    const createUser = async (user) => {

      // create asset #user.profile_picture
      const asset = { get: () => 1 }

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

    const state = req.query.state.split('|').reduce((state, pair) => {
      const parts = pair.split(':')
      return {
        ...state,
        [parts[0]]: parts[1]
      }
    }, {})

    const self = await getUser(req.query.access_token)

    const user = await findTourist(self, state.tourist_id) || await findUser(self) || await createUser(self)

    await user.load(['photo'])

    res.render('token', {
      redirect: state.redirect || '/',
      user: SessionSerializer(user)
    })

  }))

  return router

}

export default signin
