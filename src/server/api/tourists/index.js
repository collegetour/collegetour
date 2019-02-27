import show from './show'
import destroy from './destroy'
import create from './create'
import resend from './resend'
import { Router } from 'express'
import { t } from '../../utils'

const router = new Router({ mergeParams: true })

router.get('/', t(show))

router.post('/', t(create))

router.delete('/:id', t(destroy))

router.post('/:id/resend', t(resend))

export default router
