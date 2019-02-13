import Tourist from '../models/tourist'
import Hashids from 'hashids'
import express from 'express'
import path from 'path'

const router = express()

router.set('views', path.join(__dirname, '..', 'views'))

router.set('view engine', 'ejs')

router.get('/invitations/:code', async (req, res) => {

  const hashids = new Hashids()

  const values = hashids.decode(req.params.code)

  const tourist = await Tourist.where({
    id: values[1]
  }).fetch()

  return res.render('invitation', {
    tourist_id: tourist.get('id')
  })

})

export default router
