import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import setup from './setup'
import * as actions from './actions'

export default Factory({
  namespace: 'setup',
  component: setup,
  reducer,
  actions
})
