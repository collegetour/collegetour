import create from './create'
import { t } from '../../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.post('/api/tours/:tour_id/visits/:visit_id/photos', t(create))

export default router
