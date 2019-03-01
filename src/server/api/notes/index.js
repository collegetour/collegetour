import create from './create'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.post('/', create)

export default router
