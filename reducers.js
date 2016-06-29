import { combineReducers } from 'redux'

let topics = (state=[], action) => {
  console.log("ACTION!!!")
  console.log(action)
  switch (action.type) {
    case 'FETCH_TOPICS':
      return action.topics
    default:
      return []
  }
}


let reducers = combineReducers({
  topics
})

export default reducers
