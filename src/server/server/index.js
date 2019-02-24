import imagecache from './imagecache'
import instagram from './instagram'
import facebook from './facebook'
import { Router } from 'express'
import google from './google'

const server = new Router({ mergeParams: true })

server.use(instagram)

server.use(facebook)

server.use(google)

server.use(imagecache)

export default server
