import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import tourists from './tourists'
import * as actions from './actions'

export default Factory({
  namespace: 'tourists',
  component: tourists,
  reducer,
  actions
})
