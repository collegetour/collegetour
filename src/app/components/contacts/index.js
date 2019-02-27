import { Singleton } from 'redux-rubberstamp'
import contacts from './contacts'
import * as selectors from './selectors'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'contacts',
  component: contacts,
  actions,
  selectors,
  reducer
})
