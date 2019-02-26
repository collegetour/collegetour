import show from './show'
import destroy from './destroy'
import resend from './resend'
import { Router } from 'express'
import { t } from '../../utils'

const router = new Router({ mergeParams: true })

router.get('/api/tours/:tour_id/tourists', t(show))

router.delete('/api/tours/:tour_id/tourists/:id', t(destroy))

router.post('/api/tours/:tour_id/tourists/:id/resend', t(resend))

export default router
