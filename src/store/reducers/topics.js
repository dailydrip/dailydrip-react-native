import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'
import { FETCH_TOPICS, FETCH_DRIPS, SET_TOPICS, SET_DRIPS } from '../../actions'
import { loop, Effects } from 'redux-loop';
import API from '../../api'

function fetchTopics(){
  API.getTopics().then((response) => {
    const topicsMap = response.data.topics.reduce((acc, topic) => {
      return acc.set(topic.id, Immutable.fromJS(topic))
    }, Immutable.Map())
    return Actions.setTopics(topicsMap)
  }).catch((error) => {
    console.log(error)
  })
}

function fetchDrips(topicId){
  API.getDrips(topicId).then((response) => {
    const dripsMap = response.data.drips.reduce((acc, drip) => {
      return acc.set(drip.id, Immutable.fromJS(drip))
    }, Immutable.Map())
    return Actions.setDrips(topicId, dripsMap)
  }).catch((error) => {
    console.log(error)
  })
}

export default createReducer(Immutable.Map(), {
  [FETCH_TOPICS]: (state, action) => {
    return loop( 
        state.set('loading', true),
        Effects.promise(fetchTopics)
      )
  },

  [SET_TOPICS]: (state, action) => {
    const topics = action.topics.map((topic) => {
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
    return loop(
      state.set('topics', topics).set('loading', false),
      Effects.none()
    )
  },

  [FETCH_DRIPS]: (state, { topicId }) => {
    return loop(
      state.set('loading', true),
      Effects.promise(fetchDrips(topicId))
    )
  },

  [SET_DRIPS]: (state, { topicId, drips }) => {
    let newState = state.setIn([topicId, 'drips'], drips)
    return loop(
      newState.set('loading', false),
      Effects.none()
    )
  },
})
