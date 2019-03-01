import { sendInvitation } from '../../services/invitations'
import Tourist from '../../models/tourist'

const route = async (req, res) => {

  const tourist = await Tourist.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx,
    withRelated: ['user','tour']
  })

  await sendInvitation(req.user, tourist)

  res.status(200).json({
    data: true
  })

}

export default route
