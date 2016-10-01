import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutablejs'

import createLogger from 'redux-logger'
const logger = createLogger()

import Immutable from 'immutable'
import * as reducers from './reducers'

const initialState = Immutable.fromJS({
  topics: {},
  drips: [],
  drip: null
})


export default compose(
  applyMiddleware(logger)
)(createStore)(combineReducers(reducers), initialState)
