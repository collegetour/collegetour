import './lib/environment'
import imagecache from './server/imagecache'
import multiparty from 'connect-multiparty'
import signin from './server/signin'
import bodyParser from 'body-parser'
import express from 'express'
import api from './api'
import cors from 'cors'
import qs from 'qs'
import path from 'path'

const app = express()

app.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

app.use(bodyParser.json({ limit: '5mb' }))

app.use(multiparty({ uploadDir: './tmp' }))

app.use(cors())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/ping', (req, res) => res.send('pong'))

app.use('/signin', signin)

app.use('/imagecache', imagecache)

app.use('/api', api)

app.listen(3001)

export default app
