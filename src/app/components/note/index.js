import { Singleton } from 'redux-rubberstamp'
import note from './note'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'note',
  component: note,
  actions,
  reducer
})
