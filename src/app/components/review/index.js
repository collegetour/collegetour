import { Singleton } from 'redux-rubberstamp'
import review from './review'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'review',
  component: review,
  actions,
  reducer
})
