import TourSerializer from '../../serializers/tour_serializer'
import Tour from '../../models/tour'

const route = async (req, res, trx) => {

  const tours = await Tour.query(qb => {

    qb.innerJoin('tourists', 'tourists.tour_id', 'tours.id')

    qb.where('tourists.user_id', req.user.get('id'))

  }).fetchAll({
    transacting: trx,
    withRelated: ['owner.photo']
  })

  res.status(200).json({
    data: tours.map(TourSerializer)
  })

}

export default route
