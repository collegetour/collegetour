import { Router } from 'express'
import { t } from '../../utils'
import show from './show'
import update from './update'
import setup from './setup'

const router = new Router({ mergeParams: true })

router.get('/api/account', t(show))

router.patch('/api/account', t(update))

router.patch('/api/setup', t(setup))

export default router
