import impressions from './api/impressions'
import multiparty from 'connect-multiparty'
import instagram from './api/instagram'
import facebook from './api/facebook'
import colleges from './api/colleges'
import bodyParser from 'body-parser'
import session from './api/session'
import visits from './api/visits'
import tours from './api/tours'
import token from './api/token'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import qs from 'qs'

dotenv.load({
  path: path.join('.env')
})

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use(instagram)

server.use(facebook)

server.use(token)

server.use(session)

server.use(colleges)

server.use(tours)

server.use(visits)

server.use(impressions)

server.use((err, req, res, next) => {
  res.status(500).render('error', { error: err })
})

export default server
