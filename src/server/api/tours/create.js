import TourSerializer from '../../serializers/tour_serializer'
import Tourist from '../../models/tourist'
import Tour from '../../models/tour'

const route = async (req, res, trx) => {

  const tour = await Tour.forge({
    name: req.body.name,
    origin: req.body.origin,
    destination: req.body.destination,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  }).save(null, {
    transacting: trx
  })

  await Tourist.forge({
    tour_id: tour.get('id'),
    user_id: req.user.get('id')
  }).save(null, {
    transacting: trx
  })

  res.status(200).json({
    data: TourSerializer(tour)
  })

}

export default route
