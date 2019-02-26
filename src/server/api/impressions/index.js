import { t } from '../../utils'
import { Router } from 'express'
import list from './list'
import show from './show'
import update from './update'
import destroy from './destroy'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/visits/:visit_id/impressions', t(list))

router.get('/api/tours/:tour_id/visits/:visit_id/impressions/:id', t(show))

router.patch('/api/tours/:tour_id/visits/:visit_id/impressions/:id', t(update))

router.delete('/api/tours/:tour_id/visits/:visit_id/impressions/:id', t(destroy))

export default router
