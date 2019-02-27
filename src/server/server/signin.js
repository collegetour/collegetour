import instagram from './instagram'
import facebook from './facebook'
import { Router } from 'express'
import google from './google'

const server = new Router({ mergeParams: true })

server.use('/instagram', instagram)

server.use('/facebook', facebook)

server.use('/google', google)

export default server
