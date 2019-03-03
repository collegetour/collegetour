import './lib/environment'
import 'express-async-errors'
import withTransaction from './utils/transactions'
import imagecache from './server/imagecache'
import multiparty from 'connect-multiparty'
import signin from './server/signin'
import bodyParser from 'body-parser'
import error from './utils/error'
import express from 'express'
import api from './api'
import cors from 'cors'
import path from 'path'
import qs from 'qs'

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use(cors())

server.use(express.static(path.join(__dirname, '..', 'public')))

server.use('/ping', (req, res) => res.send('pong'))

server.use('/imagecache', imagecache)

server.use('/signin', withTransaction, signin)

server.use('/api', withTransaction, api)

server.use(error)

server.listen(3001)

export default server
