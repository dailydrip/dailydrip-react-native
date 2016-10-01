import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { FETCH_TOPICS, FETCH_DRIPS, SET_DRIP, SELECT_TOPIC } from '../actions'

export const topics = createReducer(Immutable.Map(), {
  [FETCH_TOPICS]: (state, { topics }) => topics,
  [FETCH_DRIPS]: (state, { topicId, drips }) => {
    return state.setIn([topicId, 'drips'], drips)
  },
})

export const selectedTopic = createReducer(Immutable.Map(), {
  [SELECT_TOPIC]: (state, { topicId }) => state.set('id', topicId)
})

export const drip = createReducer(Immutable.fromJS({}), {
  [SET_DRIP]: (state, action) => action.drip,
})
