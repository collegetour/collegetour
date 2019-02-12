import { Singleton } from 'redux-rubberstamp'
import Itinerary from './itinerary'
import * as actions from './actions'
import reducer from './reducer'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'plan.itinerary',
  component: Itinerary,
  actions,
  selectors,
  reducer
})
