import './services/environment'
import multiparty from 'connect-multiparty'
import bodyParser from 'body-parser'
import express from 'express'
import qs from 'qs'
import api from './api'
import server from './server'

const app = express()

app.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

app.use(bodyParser.json({ limit: '5mb' }))

app.use(multiparty({ uploadDir: './tmp' }))

app.use(server)

app.use(api)

app.use((err, req, res, next) => {
  res.status(500).render('error', { error: err })
})

export default app
