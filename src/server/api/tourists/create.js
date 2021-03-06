import UserSerializer from '../../serializers/user_serializer'
import { sendInvitation } from '../../services/invitations'
import Tourist from '../../models/tourist'
import User from '../../models/user'
import Tour from '../../models/tour'
import moment from 'moment'

const route = async (req, res) => {

  const tour = await Tour.where({
    id: req.params.tour_id
  }).fetch({
    transacting: req.trx
  })

  const user = await User.forge({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    agreed_to_terms: false,
    created_at: moment(),
    updated_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  const tourist = await Tourist.forge({
    tour_id: tour.get('id'),
    user_id: user.get('id'),
    created_at: moment(),
    updated_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  await tourist.load(['tour', 'user'], {
    transacting: req.trx
  })

  await sendInvitation(req.user, tourist)

  const data = UserSerializer(user)

  res.status(200).json({ data })

}

export default route
