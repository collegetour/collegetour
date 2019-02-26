import SessionSerializer from '../../serializers/session_serializer'

const route = async (req, res, trx) => {

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}

export default route
