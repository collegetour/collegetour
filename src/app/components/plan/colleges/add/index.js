import { Singleton } from 'redux-rubberstamp'
import Add from './add'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'plan.colleges.add',
  component: Add,
  actions,
  reducer
})
