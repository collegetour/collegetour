import VisitSerializer from '../serializers/visit_serializer'
import Visit from '../models/visit'
import { Router } from 'express'

const visits = new Router({ mergeParams: true })

visits.get('/api/tours/:tour_id/visits', async (req, res) => {

  const visits = await Visit.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: visits.map(VisitSerializer)
  })

})

visits.get('/api/tours/:tour_id/visits/:id', async (req, res) => {

  const visit = await Visit.where({
    id: req.params.id
  }).fetch({
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: VisitSerializer(visit)
  })

})
export default visits
