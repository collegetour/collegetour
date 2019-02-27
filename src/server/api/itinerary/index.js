import { t } from '../../utils'
import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', t(show))

export default router
