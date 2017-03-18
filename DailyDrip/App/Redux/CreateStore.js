import { createStore,
  applyMiddleware,
  compose,
  combineReducers } from 'redux'
import RemoteReduxDevTools from 'remote-redux-devtools'
import Immutable from 'immutable'
import reducers from './reducers'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import {AsyncStorage} from 'react-native'

let devTools

if (global.reduxNativeDevTools) {
  devTools = global.reduxNativeDevTools
} else {
  devTools = RemoteReduxDevTools
}

import createLogger from 'redux-logger'
const loggerMiddleware = createLogger({
  stateTransformer: state => state && state.toJS()
})

const enhancer = compose(
  applyMiddleware(thunk),
  devTools(),
  autoRehydrate({log: true})
)

// creates the store
export default () => {
  let dev = __DEV__

  let store = createStore(
      reducers,
      undefined,
      enhancer
    )

  if (dev) {
    store = Reactotron.createStore(
      reducers,
      undefined,
      enhancer
    )
  }

  devTools.updateStore(store)
  // begin periodically persisting the store
  //disable in debug mode -- running on V8
  // https://github.com/rt2zz/redux-persist/issues/265
  persistStore(store, {storage: AsyncStorage})
  console.log('creating store', store)
  return store
}
