import { Router } from 'express'
import College from '../models/college'

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
    data: colleges.map(college => ({
      id: college.get('id'),
      name: college.get('name'),
      city: college.get('city'),
      state: college.get('state'),
      logo: college.related('logo').get('url'),
      created_at: college.get('created_at'),
      updated_at: college.get('updated_at')
    }))
  })

})

export default colleges
