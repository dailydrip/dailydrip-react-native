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

const setDrip = (drip) => {
  return {
    type: "SET_DRIP",
    drip
  }
}

const Actions = {
  setTopics,
  setDrips,
  setDrip
}

export default Actions
