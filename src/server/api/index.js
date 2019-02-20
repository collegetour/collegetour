import impressions from './impressions'
import invitations from './invitations'
import itinerary from './itinerary'
import tourists from './tourists'
import colleges from './colleges'
import { Router } from 'express'
import session from './session'
import account from './account'
import assets from './assets'
import visits from './visits'
import tours from './tours'
import token from './token'

const api = new Router({ mergeParams: true })

api.use(assets)

api.use(token)

api.use(account)

api.use(session)

api.use(colleges)

api.use(tours)

api.use(invitations)

api.use(tourists)

api.use(itinerary)

api.use(visits)

api.use(impressions)

export default api
