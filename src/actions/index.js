export const FETCH_TOPICS = 'FETCH_TOPICS'
export const FETCH_DRIPS = 'FETCH_DRIPS'
export const SET_TOPICS = 'SET_TOPICS'
export const SET_DRIPS = 'SET_DRIPS'
export const SELECT_TOPIC = 'SELECT_TOPIC'

const setTopics = (topics) => {
  return {
    type: SET_TOPICS,
    topics,
  }
}

const setDrips = (topicId, drips) => {
  return {
    type: SET_DRIPS,
    topicId,
    drips,
  }
}

const fetchTopics = () => {
  return {
    type: FETCH_TOPICS
  }
}

const fetchDrips = (topicId) => {
  return {
    type: FETCH_DRIPS,
    topicId
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
