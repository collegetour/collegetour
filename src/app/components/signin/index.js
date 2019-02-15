import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import signin from './signin'
import * as actions from './actions'

export default Factory({
  namespace: 'signin',
  component: signin,
  reducer,
  actions
})
