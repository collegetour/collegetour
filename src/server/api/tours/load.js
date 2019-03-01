import Tour from '../../models/tour'

const route = async (req, res, next) => {

  const tour = await Tour.query(qb => {
    qb.innerJoin('tourists', 'tourists.tour_id', 'tours.id')
    qb.where('tourists.user_id', req.user.get('id'))
    qb.where('tours.id', req.params.tour_id)
  }).fetch({
    transacting: req.trx
  })

  if(!tour) return res.status(404).json({
    message: 'Unable to load tour'
  })

  req.tour = tour

  next()

}

export default route
