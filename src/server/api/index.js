import impressions from './impressions'
import itinerary from './itinerary'
import tourists from './tourists'
import colleges from './colleges'
import visit from './visits/load'
import { Router } from 'express'
import session from './session'
import account from './account'
import tour from './tours/load'
import assets from './assets'
import visits from './visits'
import photos from './photos'
import tours from './tours'
import token from './token'
import notes from './notes'

const api = new Router({ mergeParams: true })

api.use(token)

api.use('/assets', assets)

api.use('/account', account)

api.use('/session', session)

api.use('/colleges', colleges)

api.use('/tours', tours)

api.use('/tours/:tour_id/tourists', tour, tourists)

api.use('/tours/:tour_id/itinerary', tour, itinerary)

api.use('/tours/:tour_id/visits', tour, visits)

api.use('/tours/:tour_id/visits/:visit_id/impressions', tour, visit, impressions)

api.use('/tours/:tour_id/visits/:visit_id/notes', tour, visit, notes)

api.use('/tours/:tour_id/visits/:visit_id/photos', tour, visit, photos)

export default api
