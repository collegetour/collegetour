import impressions from './impressions'
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

import photos from './photos'
import notes from './notes'

const api = new Router({ mergeParams: true })

api.use(token)

api.use('/assets', assets)

api.use('/account', account)

api.use('/session', session)

api.use('/colleges', colleges)

api.use('/tours', tours)

api.use('/tours/:tour_id/tourists', tourists)

api.use('/tours/:tour_id/itinerary', itinerary)

api.use('/tours/:tour_id/visits', visits)

api.use('/tours/:tour_id/visits/:visit_id/impressions', impressions)

api.use('/tours/:tour_id/visits/:visit_id/notes', notes)

api.use('/tours/:tour_id/visits/:visit_id/photos', photos)

export default api
