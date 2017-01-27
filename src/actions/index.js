export const FETCH_TOPICS = 'FETCH_TOPICS'
export const FETCH_DRIPS = 'FETCH_DRIPS'
export const FETCH_USER_INFORMATION = 'FETCH_USER_INFORMATION'
export const GOT_USER_INFORMATION = 'GOT_USER_INFORMATION'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_EMAIL = 'SET_USER_EMAIL'
export const UPDATE_USER_INFORMATION = 'UPDATE_USER_INFORMATION'
export const SET_TOPICS = 'SET_TOPICS'
export const SET_DRIPS = 'SET_DRIPS'
export const SELECT_TOPIC = 'SELECT_TOPIC'
export const NO_OP = 'NO_OP'

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

const updateUserInformation = (name, email) => {
  return {
    type: UPDATE_USER_INFORMATION,
    name,
    email,
  }
}

const fetchUserInformation = () => {
  return {
    type: FETCH_USER_INFORMATION
  }
}

const gotUserInformation = (name, email) => {
  return {
    type: GOT_USER_INFORMATION,
    name,
    email
  }
}

const setUserName = (name) => {
  return {
    type: SET_USER_NAME,
    name
  }
}

const setUserEmail = (email) => {
  return {
    type: SET_USER_EMAIL,
    email
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

const noOp = () => {
  return {
    type: NO_OP
  }
}

export const Actions = {
  setTopics,
  setDrips,
  updateUserInformation,
  selectTopic,
  fetchTopics,
  fetchUserInformation,
  gotUserInformation,
  setUserName,
  setUserEmail,
  fetchDrips
}
