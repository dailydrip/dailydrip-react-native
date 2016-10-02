import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import merger from 'redux-storage-merger-immutablejs'
import RemoteReduxDevTools from 'remote-redux-devtools'

let devTools

if (global.reduxNativeDevTools) {
  devTools = global.reduxNativeDevTools
} else {
  devTools = RemoteReduxDevTools
}

import * as Loop from 'redux-loop'

import Immutable from 'immutable'
import * as reducers from './reducers'

// LOG OUT STATE CHANGES
import createLogger from 'redux-logger'
const loggerMiddleware = createLogger({
  stateTransformer: state => state && state.toJS(),
})
// END LOG OUT STATE CHANGES

// STORE REDUX STATE
const reducer = storage.reducer(combineReducers(reducers), merger)
const storageEngine = createEngine('@DAILYDRIP.reduxStore')
const storageMiddleware = storage.createMiddleware(storageEngine)
export const storageLoader = storage.createLoader(storageEngine)
// END STORE REDUX STATE

const initialState = Immutable.fromJS({
  topics: {},
  selectedTopic: {}, // NOTE: This is presently intended to end up as just a map with a basic `id` key - this is because you can't do immutable ints and I wanted to use createReducer throughout, but it's probably dumb...
  drip: null,
})

const enhancer = compose(
  applyMiddleware(loggerMiddleware, storageMiddleware),
  Loop.install(),
  devTools()
)

const store = createStore(reducer, initialState, enhancer)
devTools.updateStore(store)

export default store
