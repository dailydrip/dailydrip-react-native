export const FETCH_TOPICS = 'FETCH_TOPICS'
export const FETCH_DRIPS = 'FETCH_DRIPS'
export const SELECT_TOPIC = 'SELECT_TOPIC'
export const PUSH_ROUTE = 'Navigation/PUSH_ROUTE'
export const POP_ROUTE = 'Navigation/POP_ROUTE'

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

const pushRoute = (route) => {
  return {
    type: PUSH_ROUTE,
    payload: route,
  }
}

const popRoute = () => {
  return {
    type: POP_ROUTE,
  }
}

const Actions = {
  setTopics,
  setDrips,
  selectTopic,
  pushRoute,
  popRoute,
}

export default Actions
