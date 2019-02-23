import request from 'request-promise'
import { Router } from 'express'
import { t } from '../utils'
import sharp from 'sharp'
import url from 'url'
import qs from 'qs'

const router = new Router({ mergeParams: true })

router.get('/imagecache/*', t(async (req, res, trx) => {

  const transformed = await transform(req.originalUrl)

  res.type('jpeg').status(200).send(transformed)

}))

const transform = async(originalUrl) => {

  const uri = url.parse(originalUrl)

  const raw = uri.path.replace('/imagecache/', '')

  const parts = raw.split('/')

  const matches = parts[0].match(/\w*=\w*/)

  const transform = matches ? qs.parse(parts[0]) : {}

  const path = matches ? parts.slice(1).join('/') : parts.join('/')

  const original = await request.get({
    url: `${process.env.ASSET_HOST}/${path}`,
    encoding: null
  })

  const source = sharp(original)

  const dpi = transform.dpi ? parseInt(transform.dpi) : 1

  const w = transform.w ? parseInt(transform.w) * dpi : null

  const h = transform.h ? parseInt(transform.h) * dpi : null

  if(w & h) return await source.resize(w, h, { fit: sharp.fit.cover }).jpeg({ quality: 70 }).toBuffer()

  if(w) return await sharp(original).resize(w).jpeg({ quality: 70 }).toBuffer()

  return original

}

export default router
