import ImpressionSerializer from '../../serializers/impression_serializer'
import Impression from '../../models/impression'

const route = async (req, res) => {

  const impression = await Impression.query(qb => {
    qb.where('visit_id', req.visit.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx,
    withRelated: ['asset', 'user.photo', 'visit.college']
  })

  if(!impression) return res.status(404).json({
    message: 'Unable to load impression'
  })

  res.status(200).json({
    data: ImpressionSerializer(impression)
  })

}

export default route
