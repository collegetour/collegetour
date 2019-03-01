import ImpressionSerializer from '../../serializers/impression_serializer'
import Impression from '../../models/impression'

const route = async (req, res) => {

  const impression = await Impression.forge({
    type: 'note',
    visit_id: req.params.visit_id,
    user_id: req.user.get('id'),
    text: req.body.text
  }).save(null, {
    transacting: req.trx
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}

export default route
