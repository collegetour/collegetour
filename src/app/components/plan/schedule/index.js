import { Singleton } from 'redux-rubberstamp'
import Schedule from './schedule'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'plan.schedule',
  component: Schedule,
  actions,
  reducer
})
