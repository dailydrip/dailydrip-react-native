export const FETCH_TOPICS = 'FETCH_TOPICS'
export const FETCH_DRIPS = 'FETCH_DRIPS'
export const SELECT_TOPIC = 'SELECT_TOPIC'

const setTopics = (topics) => {
  return {
    type: FETCH_TOPICS,
    topics,
  }
}

const setDrips = (topicId, drips) => {
  return {
    type: FETCH_DRIPS,
    topicId,
    drips,
  }
}

const selectTopic = (topicId) => {
  return {
    type: SELECT_TOPIC,
    topicId,
  }
}

const Actions = {
  setTopics,
  setDrips,
  selectTopic,
}

export default Actions
