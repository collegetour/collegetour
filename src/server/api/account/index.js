import { Router } from 'express'
import { t } from '../../utils'
import show from './show'
import update from './update'
import setup from './setup'

const router = new Router({ mergeParams: true })

router.get('/', t(show))

router.patch('/', t(update))

router.patch('/setup', t(setup))

export default router
