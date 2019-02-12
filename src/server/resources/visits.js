import { Router } from 'express'
import Visit from '../models/visit'

const visits = new Router({ mergeParams: true })

visits.get('/api/tours/:tour_id/visits', async (req, res) => {

  const tours = await Visit.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: tours.map(tour => ({
      id: tour.get('id'),
      delta: tour.get('delta'),
      college: {
        name: tour.related('college').get('name'),
        city: tour.related('college').get('city'),
        state: tour.related('college').get('state'),
        schedule: tour.related('college').get('schedule'),
        logo: {
          url: tour.related('college').related('logo').get('url')
        }
      },
      info_session: tour.get('info_session'),
      college_tour: tour.get('college_tour'),
      created_at: tour.created_at,
      updated_at: tour.updated_at
    }))
  })

})

export default visits
