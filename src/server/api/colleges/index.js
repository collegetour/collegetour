import { t } from '../../utils'
import { Router } from 'express'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/api/colleges', t(list))

export default router
