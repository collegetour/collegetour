import TourSerializer from '../../serializers/tour_serializer'
import Tour from '../../models/tour'

const route = async (req, res, trx) => {

  const tour = await Tour.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['owner.photo']
  })

  res.status(200).json({
    data: TourSerializer(tour)
  })

}

export default route
