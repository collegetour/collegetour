import instagram from './api/instagram'
import facebook from './api/facebook'
import colleges from './api/colleges'
import visits from './api/visits'
import tours from './api/tours'
import token from './api/token'
import user from './api/user'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

dotenv.load({
  path: path.join('.env')
})

const server = express()

server.use(instagram)

server.use(facebook)

server.use(token)

server.use(colleges)

server.use(tours)

server.use(user)

server.use(visits)

export default server
