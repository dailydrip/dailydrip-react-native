export const FETCH_TOPICS = 'FETCH_TOPICS'
export const FETCH_DRIPS = 'FETCH_DRIPS'
export const SET_DRIP = 'SET_DRIP'

const setTopics = (topics) => {
  return {
    type: FETCH_TOPICS,
    topics
  }
}

const setDrips = (drips) => {
  return {
    type: FETCH_DRIPS,
    drips
  }
}

const setDrip = (drip) => {
  return {
    type: SET_DRIP,
    drip
  }
}

const Actions = {
  setTopics,
  setDrips,
  setDrip
}

export default Actions
