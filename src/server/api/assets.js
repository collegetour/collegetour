import { checkUploadedFile, uploadChunk } from '../services/assets'
import { Router } from 'express'
import { t } from '../utils'

const router = new Router({ mergeParams: true })

router.get('/api/assets/upload', t(async (req, res, trx) => {

  console.log('get asset', req.query)

  const exists = await checkUploadedFile(req, trx)

  if(!exists) return res.status(204).send('not found')

  res.status(200).send('found')

}))

router.post('/api/assets/upload', t(async (req, res, trx) => {

  console.log('upload asset', req.query)

  const data = await uploadChunk(req, trx)

  res.status(200).json({ data })

}))

export default router
