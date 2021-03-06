import './lib/environment'
import 'express-async-errors'
import withTransaction from './utils/transaction'
import imagecache from './server/imagecache'
import multiparty from 'connect-multiparty'
import signin from './server/signin'
import bodyParser from 'body-parser'
import logger from './utils/logger'
import error from './utils/error'
import ping from './utils/ping'
import express from 'express'
import path from 'path'
import cors from 'cors'
import api from './api'
import qs from 'qs'

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use(cors())

server.use(express.static(path.join(__dirname, 'public')))

server.use(withTransaction)

if(process.env.NODE_ENV !== 'production') server.use(logger)

server.use('/imagecache', imagecache)

server.use('/signin', signin)

server.use('/ping', ping)

server.use('/api', api)

server.use(error)

server.listen(3001, () => {
  console.log('Listening at 3001')
})
