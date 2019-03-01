import VisitSerializer from '../../serializers/visit_serializer'
import Visit from '../../models/visit'

const route = async (req, res) => {

  const visits = await Visit.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    transacting: req.trx,
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: visits.map(VisitSerializer)
  })

}

export default route
