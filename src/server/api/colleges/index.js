import { t } from '../../utils'
import { Router } from 'express'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', t(list))

export default router
