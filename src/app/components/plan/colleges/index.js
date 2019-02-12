import { Singleton } from 'redux-rubberstamp'
import Colleges from './colleges'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'plan.colleges',
  component: Colleges,
  actions,
  reducer
})
