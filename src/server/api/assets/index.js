import { Router } from 'express'
import { t } from '../../utils'
import show from './show'
import update from './update'

const router = new Router({ mergeParams: true })

router.get('/api/assets/upload', t(show))

router.post('/api/assets/upload', t(update))

export default router
