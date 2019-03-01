import create from './create'
import { t } from '../../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.post('/', create)

export default router
