import ImpressionSerializer from '../../serializers/impression_serializer'
import Impression from '../../models/impression'

const route = async (req, res) => {

  const impression = await Impression.forge({
    type: 'photo',
    visit_id: req.params.visit_id,
    user_id: req.user.get('id'),
    asset_id: req.body.asset_id
  }).save(null, {
    transacting: req.trx
  })

  await impression.load(['asset', 'user.photo'])

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}

export default route
