import { combineReducers } from 'redux'

let topics = (state=[], action) => {
  switch (action.type) {
    case 'FETCH_TOPICS':
      return action.topics
    default:
      return state
  }
}

let drips = (state=[], action) => {
  switch (action.type) {
    case 'FETCH_DRIPS':
      return action.drips
    default:
      return state
  }
}

let drip = (state={}, action) => {
  switch (action.type) {
    case 'SET_DRIP':
      return action.drip
    default:
      return {
        title: "Some drip yo"
      }
  }
}

let reducers = combineReducers({
  topics,
  drips,
  drip
})

export default reducers
