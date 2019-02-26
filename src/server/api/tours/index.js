import { Router } from 'express'
import { t } from '../../utils'
import list from './list'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/api/tours', t(list))

router.post('/api/tours', t(create))

router.get('/api/tours/:id', t(show))

export default router
