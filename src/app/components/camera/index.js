import { Singleton } from 'redux-rubberstamp'
import Camera from './camera'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'camera',
  component: Camera,
  actions,
  reducer
})
