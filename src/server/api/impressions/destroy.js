import Impression from '../../models/impression'

const route = async (req, res) => {

  const impression = await Impression.query(qb => {
    qb.where('visit_id', req.visit.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!impression) return res.status(404).json({
    message: 'Unable to load impression'
  })

  await impression.destroy({
    transacting: req.trx
  })

  res.status(200).json({
    data: null
  })

}

export default route
