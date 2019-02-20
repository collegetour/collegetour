import { Singleton } from 'redux-rubberstamp'
import photo from './photo'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'photo',
  component: photo,
  actions,
  reducer
})
