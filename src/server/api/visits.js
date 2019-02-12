import { Router } from 'express'
import Visit from '../models/visit'

const visits = new Router({ mergeParams: true })

visits.get('/api/tours/:tour_id/visits', async (req, res) => {

  const visits = await Visit.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: visits.map(visit => ({
      id: visit.get('id'),
      delta: visit.get('delta'),
      college: {
        name: visit.related('college').get('name'),
        city: visit.related('college').get('city'),
        state: visit.related('college').get('state'),
        schedule: visit.related('college').get('schedule'),
        logo: visit.related('college').related('logo').get('url')
      },
      date: visit.get('date'),
      info_session: visit.get('info_session'),
      college_tour: visit.get('college_tour'),
      created_at: visit.get('created_at'),
      updated_at: visit.get('updated_at')
    }))
  })

})

visits.get('/api/tours/:tour_id/visits/:id', async (req, res) => {

  const visit = await Visit.where({
    id: req.params.id
  }).fetch({
    withRelated: ['college.logo']
  })

  res.status(200).json({
    data: {
      id: visit.get('id'),
      delta: visit.get('delta'),
      college: {
        name: visit.related('college').get('name'),
        city: visit.related('college').get('city'),
        state: visit.related('college').get('state'),
        schedule: visit.related('college').get('schedule'),
        logo: visit.related('college').related('logo').get('url')
      },
      date: visit.get('date'),
      info_session: visit.get('info_session'),
      college_tour: visit.get('college_tour'),
      created_at: visit.get('created_at'),
      updated_at: visit.get('updated_at')
    }
  })

})
export default visits
