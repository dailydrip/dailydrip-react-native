const setTopics = (topics) => {
  return {
    type: "FETCH_TOPICS",
    topics
  }
}

const Actions = {
  setTopics: setTopics
}

export default Actions
