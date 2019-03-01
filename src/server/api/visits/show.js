import VisitSerializer from '../../serializers/visit_serializer'
import Visit from '../../models/visit'

const route = async (req, res) => {

  const visit = await Visit.query(qb => {
    qb.where('visits.tour_id', req.tour.get('id'))
    qb.where('visits.id', req.params.id)
  }).fetch({
    transacting: req.trx,
    withRelated: ['college.logo']
  })

  if(!visit) return res.status(404).json({
    message: 'Unable to load visit'
  })

  res.status(200).json({
    data: VisitSerializer(visit)
  })

}

export default route
