import TouristSerializer from '../../serializers/tourist_serializer'
import Tourist from '../../models/tourist'

const route = async (req, res, trx) => {

  const tourists = await Tourist.where({
    tour_id: req.params.tour_id
  }).fetchAll({
    transacting: trx,
    withRelated: ['user.photo','tour']
  })

  res.status(200).json({
    data: tourists.map(TouristSerializer)
  })

}

export default route
