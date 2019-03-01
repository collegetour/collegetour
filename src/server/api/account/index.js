import { Router } from 'express'
import update from './update'
import setup from './setup'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.patch('/', update)

router.patch('/setup', setup)

export default router
