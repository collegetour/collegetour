import VisitSerializer from '../../serializers/visit_serializer'
import Visit from '../../models/visit'

const route = async (req, res) => {

  const visits = await Visit.query(qb => {
    qb.where('visits.tour_id', req.tour.get('id'))
  }).fetchAll({
    transacting: req.trx,
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: visits.map(VisitSerializer)
  })

}

export default route
