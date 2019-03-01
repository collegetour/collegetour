import SessionSerializer from '../../serializers/session_serializer'
import Checkit from 'checkit'

const route = async (req, res) => {

  await Checkit({
    agreed_to_terms: 'accepted'
  }).run(req.body)

  await req.user.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    agreed_to_terms: req.body.agreed_to_terms
  }, {
    transacting: req.trx,
    patch: true
  })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}

export default route
