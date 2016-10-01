import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import { Iterable } from 'immutable'

import createLogger from 'redux-logger'
const logger = createLogger({
  stateTransformer: state => state && state.toJS()
})

import Immutable from 'immutable'
import * as reducers from './reducers'

const initialState = Immutable.fromJS({
  topics: {},
  selectedTopic: {}, // NOTE: This is presently intended to end up as just a map with a basic `id` key - this is because you can't do immutable ints and I wanted to use createReducer throughout, but it's probably dumb...
  drips: [],
  drip: null
})

export default compose(
  applyMiddleware(logger)
)(createStore)(combineReducers(reducers), initialState)
