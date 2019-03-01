import TourSerializer from '../../serializers/tour_serializer'
import Tour from '../../models/tour'

const route = async (req, res) => {

  const tour = await Tour.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx,
    withRelated: ['owner.photo']
  })

  res.status(200).json({
    data: TourSerializer(tour)
  })

}

export default route
