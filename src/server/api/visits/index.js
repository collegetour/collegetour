import { t } from '../../utils'
import list from './list'
import show from './show'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/', t(list))

router.get('/:id', t(show))

export default router
