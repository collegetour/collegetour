import './lib/environment'
import 'express-async-errors'
import expressKnextransaction from 'express-knex-transaction'
import imagecache from './server/imagecache'
import multiparty from 'connect-multiparty'
import signin from './server/signin'
import bodyParser from 'body-parser'
import express from 'express'
import knex from './lib/knex'
import error from './error'
import api from './api'
import cors from 'cors'
import path from 'path'
import qs from 'qs'

const transactions = expressKnextransaction(knex)

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use(cors())

server.use(express.static(path.join(__dirname, '..', 'public')))

server.use('/ping', (req, res) => res.send('pong'))

server.use('/imagecache', imagecache)

server.use('/signin', transactions, signin)

server.use('/api', transactions, api)

server.use(error)

server.listen(3001)

export default server
