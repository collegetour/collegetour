import show from './show'
import { t } from '../../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/', t(show))

export default router
