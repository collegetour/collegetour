import VisitSerializer from '../../serializers/visit_serializer'
import Visit from '../../models/visit'

const route = async (req, res) => {

  const visit = await Visit.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx,
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: VisitSerializer(visit)
  })

}

export default route
