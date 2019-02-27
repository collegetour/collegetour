import { t } from '../../utils'
import { Router } from 'express'
import list from './list'
import show from './show'
import update from './update'
import destroy from './destroy'

const router = new Router({ mergeParams: true })

router.get('/', t(list))

router.get('/:id', t(show))

router.patch('/:id', t(update))

router.delete('/:id', t(destroy))

export default router
