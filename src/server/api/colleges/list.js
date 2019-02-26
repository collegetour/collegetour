import CollegeSerializer from '../../serializers/college_serializer'
import College from '../../models/college'

const route = async (req, res, trx) => {

  const colleges = await College.query(qb => {

    if(!req.query.q) return

    const term = `%${req.query.q.toLowerCase()}%`

    qb.whereRaw('lower(name) like ? or lower(city) like ? or lower(state) like ?', [term, term, term])

  }).fetchAll({
    transacting: trx,
    withRelated: ['logo']
  })

  res.status(200).json({
    data: colleges.map(CollegeSerializer)
  })

}

export default route
