import { combineReducers } from 'redux'

let topics = (state=[], action) => {
  switch (action.type) {
    case 'FETCH_TOPICS':
      return action.topics
    default:
      return []
  }
}

let drips = (state=[], action) => {
  switch (action.type) {
    case 'FETCH_DRIPS':
      return action.drips
    default:
      return []
  }
}


let reducers = combineReducers({
  topics,
  drips
})

export default reducers
