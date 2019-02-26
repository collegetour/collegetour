import ImpressionSerializer from '../../serializers/impression_serializer'
import Impression from '../../models/impression'

const route = async (req, res, trx) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['asset', 'user.photo']
  })

  await impression.save({
    text: req.body.text
  }, {
    patch: true,
    transacting: trx
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}

export default route
