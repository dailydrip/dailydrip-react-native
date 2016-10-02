import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'
import { FETCH_TOPICS, FETCH_DRIPS } from '../../actions'

export default createReducer(Immutable.Map(), {
  [FETCH_TOPICS]: (state, action) => {
    return action.topics.map((topic) => {
      // Look in the store and pull in any drips we already know about, since
      // we don't have them here but we'd like to keep them for faster startup
      // from storage
      const existingTopic = state.get(topic.get('id').toString())
      let newTopic
      if (existingTopic) {
        newTopic = topic.set('drips', existingTopic.get('drips'))
      } else {
        newTopic = topic
      }
      return newTopic
    })
  },
  [FETCH_DRIPS]: (state, { topicId, drips }) => {
    return state.setIn([topicId, 'drips'], drips)
  },
})
