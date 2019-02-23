import './lib/environment'
import multiparty from 'connect-multiparty'
import bodyParser from 'body-parser'
import server from './server'
import express from 'express'
import api from './api'
import cors from 'cors'
import qs from 'qs'

const app = express()

app.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

app.use(bodyParser.json({ limit: '5mb' }))

app.use(multiparty({ uploadDir: './tmp' }))

app.use(cors())

app.use('/assets', express.static('public'))

app.use(server)

app.use(api)

app.listen(3001)

export default app
