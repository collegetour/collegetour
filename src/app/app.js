import { BrowserRouter as Router } from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { createStore, applyMiddleware } from 'redux'
import createlocalStorage from 'redux-local-storage'
import { combineReducers } from 'redux-rubberstamp'
import tokenMiddleware from './middleware/token'
import initReactFastclick from 'react-fastclick'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import localforage from 'localforage'
import PropTypes from 'prop-types'
import React from 'react'

import Portal from './components/portal'
import Host from './components/host'
import RouterStack from './components/stack/router'
import Presence from './components/presence'
import Tours from './pages/tours/list'
import Tour from './pages/tours/show'
import Plan from './pages/tours/plan'
import Visit from './pages/visits/show'
import Tourists from './pages/tours/tourists'
import NotFound from './pages/not_found'

initReactFastclick()

class App extends React.Component {

  static propTypes = {
    reducers: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.store = this._getStore()
  }

  render() {
    return (
      <Provider store={ this.store }>
        <Host>
          <Presence>
            <Portal>
              <Router>
                <RouterStack { ...this._getStack() } />
              </Router>
            </Portal>
          </Presence>
        </Host>
      </Provider>
    )
  }

  _getStore() {
    const reducers = combineReducers(this.props.reducers)
    const loggerMiddleware = createLogger({ collapsed: true })
    const apiRequestMiddleware = createApiRequest()
    const localStorageMiddleware = createlocalStorage(localforage.createInstance({
      name: 'local',
      storeName: 'collegetour'
    }))
    const middleware = [
      thunkMiddleware,
      tokenMiddleware,
      apiRequestMiddleware,
      localStorageMiddleware,
      ...(process.env.NODE_ENV !== 'production' || window.location.search.match(/log=true/) !== null) ? [loggerMiddleware] : []
    ]
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    return createStoreWithMiddleware(reducers)
  }

  _getStack() {
    return {
      routes: [
        { path: '/', component: Tours },
        { path: '/tours', component: Tours },
        { path: '/tours/:tour_id/visits', component: Tour },
        { path: '/tours/:tour_id/tourists', component: Tourists },
        { path: '/tours/:tour_id/plan', component: Plan },
        { path: '/tours/:tour_id/visits/:id', component: Visit },
        { path: '/*', component: NotFound }
      ]
    }
  }

}
App = DragDropContext(HTML5Backend)(App)

export default hot(module)(App)
