import { Router } from 'express'
import { t } from '../utils'

const router = new Router({ mergeParams: true })

router.get('/api/assets/upload', t(async (req, res, trx) => {

  res.status(200).json({})

}))

router.post('/api/assets/upload', t(async (req, res, trx) => {

  res.status(200).json({})

}))

export default router
