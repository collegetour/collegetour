import { Router } from 'express'
import { t } from '../../utils'
import list from './list'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', t(list))

router.post('/', t(create))

router.get('/:id', t(show))

export default router
