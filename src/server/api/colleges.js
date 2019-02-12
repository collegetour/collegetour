import CollegeSerializer from '../serializers/college_serializer'
import College from '../models/college'
import { Router } from 'express'

const colleges = new Router({ mergeParams: true })

colleges.get('/api/colleges', async (req, res) => {

  const colleges = await College.query(qb => {

    if(!req.query.q) return

    const term = `%${req.query.q.toLowerCase()}%`

    qb.whereRaw('lower(name) like ? or lower(city) like ? or lower(state) like ?', [term, term, term])

  }).fetchAll({
    withRelated: ['logo']
  })

  res.status(200).json({
    data: colleges.map(CollegeSerializer)
  })

})

export default colleges
