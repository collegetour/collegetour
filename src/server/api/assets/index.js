import { Router } from 'express'
import { t } from '../../utils'
import show from './show'
import update from './update'

const router = new Router({ mergeParams: true })

router.get('/upload', t(show))

router.post('/upload', t(update))

export default router
