import { Singleton } from 'redux-rubberstamp'
import Plan from './plan'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'plan',
  component: Plan,
  actions,
  reducer
})
