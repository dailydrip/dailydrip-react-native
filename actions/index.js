export const FETCH_TOPICS = 'FETCH_TOPICS'
export const FETCH_DRIPS = 'FETCH_DRIPS'
export const SET_DRIP = 'SET_DRIP'
export const SELECT_TOPIC = 'SELECT_TOPIC'

const setTopics = (topics) => {
  return {
    type: FETCH_TOPICS,
    topics
  }
}

const setDrips = (topicId, drips) => {
  return {
    type: FETCH_DRIPS,
    topicId,
    drips
  }
}

const setDrip = (drip) => {
  return {
    type: SET_DRIP,
    drip
  }
}

const selectTopic = (topicId) => {
  return {
    type: SELECT_TOPIC,
    topicId
  }
}

const Actions = {
  setTopics,
  setDrips,
  setDrip,
  selectTopic
}

export default Actions
