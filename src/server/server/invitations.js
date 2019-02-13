import Tourist from '../models/tourist'
import express from 'express'
import path from 'path'

const router = express()

router.set('views', path.join(__dirname, '..', 'views'))

router.set('view engine', 'ejs')

router.get('/invitations/:id', async (req, res) => {

  const tourist = await Tourist.where({
    id: req.params.id
  }).fetch()

  return res.render('invitation', { tourist_id: tourist.get('id') })

})

export default router
