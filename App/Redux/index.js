// @flow

import { createStore,
  applyMiddleware,
  compose,
  combineReducers } from 'redux'
import * as Loop from 'redux-loop'
import Immutable from 'immutable'
import * as reducers from './reducers'

const initialState = Immutable.fromJS({
  topics: {},

  // NOTE: `selectedTopic` is presently intended to end up as just a map with a basic `id` key - this is because you can't do immutable ints and I wanted to use createReducer throughout, but it's probably dumb...
  // TODO: Move this value into `topics` and put the topics data on a key inside
  // that map.
  selectedTopic: {},
  username: '',
  user: {
    name: '',
    email: ''
  }
})

const enhancer = compose(
  Loop.install()
)


const store = createStore(
  Loop.combineReducers(
    reducers,
    Immutable.Map(),
    (state, key) => state.get(key),
    (state, key, value) => state.set(key, value)
  ),
  initialState,
  enhancer
)

export default store
