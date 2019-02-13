import impressions from './impressions'
import instagram from './instagram'
import travelers from './travelers'
import facebook from './facebook'
import colleges from './colleges'
import { Router } from 'express'
import session from './session'
import account from './account'
import google from './google'
import visits from './visits'
import tours from './tours'
import token from './token'

const api = new Router({ mergeParams: true })

api.use(instagram)

api.use(facebook)

api.use(google)

api.use(token)

api.use(account)

api.use(session)

api.use(colleges)

api.use(tours)

api.use(travelers)

api.use(visits)

api.use(impressions)

export default api
