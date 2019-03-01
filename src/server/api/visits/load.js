import Visit from '../../models/visit'

const route = async (req, res, next) => {

  const visit = await Visit.query(qb => {
    qb.where('visits.tour_id', req.tour.get('id'))
    qb.where('visits.id', req.params.visit_id)
  }).fetch({
    transacting: req.trx
  })

  if(!visit) return res.status(404).json({
    message: 'Unable to load visit'
  })

  req.visit = visit

  next()

}

export default route
