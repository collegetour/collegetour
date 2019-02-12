import { Singleton } from 'redux-rubberstamp'
import Signin from './signin'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'signin',
  component: Signin,
  actions,
  reducer
})
