import SessionSerializer from '../serializers/session_serializer'
import { t } from '../utils'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/api/account', t(async (req, res, trx) => {

  res.status(200).json({
    data: {
      id: req.user.get('id'),
      first_name: req.user.get('first_name'),
      last_name: req.user.get('last_name'),
      email: req.user.get('email'),
      photo_id: req.user.get('photo_id'),
      agreed_to_terms: req.user.get('agreed_to_terms')
    }
  })

}))

router.patch('/api/account', t(async (req, res, trx) => {

  await req.user.save(req.body, {
    transacting: trx,
    patch: true
  })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}))

export default router
