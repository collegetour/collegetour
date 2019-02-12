import impressions from './impressions'
import instagram from './instagram'
import facebook from './facebook'
import colleges from './colleges'
import { Router } from 'express'
import session from './session'
import visits from './visits'
import tours from './tours'
import token from './token'

const api = new Router({ mergeParams: true })

api.use(instagram)

api.use(facebook)

api.use(token)

api.use(session)

api.use(colleges)

api.use(tours)

api.use(visits)

api.use(impressions)

export default api
