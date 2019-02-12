import express from 'express'
import tours from './resources/tours'
import visits from './resources/visits'

const server = express()

server.use(tours)

server.use(visits)

export default server
