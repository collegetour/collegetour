import SessionSerializer from '../serializers/session_serializer'
import { Router } from 'express'
import Checkit from 'checkit'
import { t } from '../utils'

const router = new Router({ mergeParams: true })

router.get('/api/account', t(async (req, res, trx) => {

  res.status(200).json({
    data: {
      id: req.user.get('id'),
      first_name: req.user.get('first_name'),
      last_name: req.user.get('last_name'),
      email: req.user.get('email'),
      photo_id: req.user.get('photo_id'),
      photo: req.user.related('photo').get('url'),
      agreed_to_terms: req.user.get('agreed_to_terms')
    }
  })

}))

router.patch('/api/setup', t(async (req, res, trx) => {

  const valid = await Checkit({
    agreed_to_terms: 'accepted'
  }).run(req.body)

  await req.user.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    agreed_to_terms: req.body.agreed_to_terms
  }, {
    transacting: trx,
    patch: true
  })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}))

router.patch('/api/account', t(async (req, res, trx) => {

  await req.user.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {
    transacting: trx,
    patch: true
  })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}))

export default router
