import { Singleton } from 'redux-rubberstamp'
import Feed from './feed'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'feed',
  component: Feed,
  actions,
  reducer
})
