import Immutable from 'immutable'
import { Actions, SET_TOPICS, SET_DRIPS, FETCH_TOPICS, FETCH_DRIPS } from '../actions'
import { loop, Effects } from 'redux-loop';
import API from '../../Services/DailyDripApi'

let fetchTopics = () => (
  API.getTopics()
    .then((response) => {
      return Actions.setTopics(
        response.data.topics
          .reduce((acc, topic) => {
            return acc
              .set(topic.id, Immutable.fromJS(topic))
          }, Immutable.Map())
      )
    })
    .catch((err) => {
      console.error(err)
      return Actions.noOp()
    })
)

let fetchDrips = (topicId) => {
  return API.getDrips(topicId)
    .then((response) => {

      const drips = response.data.drips
          .reduce((acc, drip) => (
            acc.set(drip.id, Immutable.fromJS(drip))
          ), Immutable.Map())

      return Actions.setDrips(topicId,drips)
    })
    .catch((err) => {
      console.error(err)
      return Actions.noOp()
    })
}

export default function(state, action){
  switch (action.type) {
    case FETCH_TOPICS:
      return loop(
        state,
        Effects.promise(fetchTopics)
      )

    case SET_TOPICS:
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
      topics,
      Effects.none()
    )

  case FETCH_DRIPS:
    return loop(
      state,
      Effects.promise(fetchDrips, action.topicId)
    )

  case SET_DRIPS:
    return loop(
      state
        .setIn([action.topicId, 'drips'], action.drips),
      Effects.none()
    )

  default:
    return state
  }
}