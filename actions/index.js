const setTopics = (topics) => {
  return {
    type: "FETCH_TOPICS",
    topics
  }
}

const setDrips = (drips) => {
  return {
    type: "FETCH_DRIPS",
    drips
  }
}

const Actions = {
  setTopics,
  setDrips
}

export default Actions
