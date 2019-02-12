import { Router } from 'express'
import Tour from '../models/tour'

const tours = new Router({ mergeParams: true })

tours.get('/api/tours', async (req, res) => {

  const tours = await Tour.query(qb => {

    qb.innerJoin('tours_users', 'tours_users.tour_id', 'tours.id')

    qb.where('tours_users.user_id', req.user.get('id'))

  }).fetchAll()

  res.status(200).json({
    data: tours.map(tour => ({
      id: tour.get('id'),
      name: tour.get('name'),
      start_date: tour.get('start_date'),
      end_date: tour.get('end_date'),
      start_address: tour.get('start_address'),
      end_address: tour.get('end_address'),
      created_at: tour.get('created_at'),
      updated_at: tour.get('updated_at')
    }))
  })

})

export default tours
