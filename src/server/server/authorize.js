import SessionSerializer from '../serializers/session_serializer'
import Tourist from '../models/tourist'
import User from '../models/user'
import moment from 'moment'
import qs from 'qs'

export default (network, findSelf) => async (req, res) => {

  const findTourist = async (self, tourist_id) => {

    if(!tourist_id) return null

    const tourist = await Tourist.where({
      id: tourist_id
    }).fetch({
      withRelated: ['user']
    })

    if(!tourist) return null

    await tourist.related('user').save({
      [`${network}_id`]: self.id
    }, { patch: true})

    return tourist.related('user')

  }

  const findUser = async (self) => await User.where({
    [`${network}_id`]: self.id
  }).fetch()

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
    }).save()

  }

  const { access_token, state } = req.query

  const { redirect, tourist_id } = qs.parse(state.split('|').join('&'))

  const self = await findSelf(access_token)

  const user = await findTourist(self, tourist_id) || await findUser(self) || await createUser(self)

  await user.load(['photo'])

  return res.render('token', { redirect, user: SessionSerializer(user) })

}
