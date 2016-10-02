import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { FETCH_TOPICS, FETCH_DRIPS, SET_DRIP, SELECT_TOPIC } from '../actions'

export const topics = createReducer(Immutable.Map(), {
  [FETCH_TOPICS]: (state, action) => {
    return action.topics.map((topic) => {
      // Look in the store and pull in any drips we already know about, since
      // we don't have them here but we'd like to keep them for faster startup
      // from storage
      const existingTopic = state.get(topic.get('id').toString())
      if(existingTopic) {
        return topic.set('drips', existingTopic.get('drips'))
      } else {
        return topic
      }
    })
  },
  [FETCH_DRIPS]: (state, { topicId, drips }) => {
    return state.setIn([topicId, 'drips'], drips)
  },
})

export const selectedTopic = createReducer(Immutable.Map(), {
  [SELECT_TOPIC]: (state, { topicId }) => state.set('id', topicId),
})

export const drip = createReducer(Immutable.fromJS({}), {
  [SET_DRIP]: (state, action) => action.drip,
})
