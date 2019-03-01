import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import resend from './resend'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.post('/', create)

router.delete('/:id', destroy)

router.post('/:id/resend', resend)

export default router
