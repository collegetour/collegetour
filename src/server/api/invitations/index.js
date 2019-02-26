import { Router } from 'express'
import { t } from '../../utils'
import create from './create'

const router = new Router({ mergeParams: true })

router.post('/api/tours/:id/invitations', t(create))

export default router
