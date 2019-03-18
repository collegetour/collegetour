import notFound from './default/not_found'
import impressions from './impressions'
import error from './default/error'
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

const router = new Router({ mergeParams: true })

router.use(token)

router.use('/assets', assets)

router.use('/account', account)

router.use('/session', session)

router.use('/colleges', colleges)

router.use('/tours', tours)

router.use('/tours/:tour_id/tourists', tour, tourists)

router.use('/tours/:tour_id/itinerary', tour, itinerary)

router.use('/tours/:tour_id/visits', tour, visits)

router.use('/tours/:tour_id/visits/:visit_id/impressions', tour, visit, impressions)

router.use('/tours/:tour_id/visits/:visit_id/notes', tour, visit, notes)

router.use('/tours/:tour_id/visits/:visit_id/photos', tour, visit, photos)

router.use(notFound)

router.use(error)

export default router
