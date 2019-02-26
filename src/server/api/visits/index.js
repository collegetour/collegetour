import { t } from '../../utils'
import list from './list'
import show from './show'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/visits', t(list))

router.get('/api/tours/:tour_id/visits/:id', t(show))

export default router
