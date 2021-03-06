import { Singleton } from 'redux-rubberstamp'
import invite from './invite'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'invite',
  component: invite,
  actions,
  reducer
})
