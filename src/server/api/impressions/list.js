import ImpressionSerializer from '../../serializers/impression_serializer'
import Impression from '../../models/impression'

const route = async (req, res) => {

  const impressions = await Impression.query(qb => {

    qb.where('visit_id', req.params.visit_id)

    qb.orderBy('created_at', 'desc')

  }).fetchAll({
    transacting: req.trx,
    withRelated: ['asset', 'user.photo']
  })

  res.status(200).json({
    data: impressions.map(ImpressionSerializer)
  })

}

export default route
