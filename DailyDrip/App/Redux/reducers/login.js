import Immutable from 'immutable'
import { Actions } from '../actions'
import API from '../../Services/DailyDripApi'
import { AsyncStorage } from 'react-native'

let attemptLogin = (username, password) => {
  return API.login(username, password).then((data) => {
    AsyncStorage.setItem('auth_token', data.data.token).done()
    const username = JSON.parse(data.config.data).email
    return Actions.logged(username)
  }).catch((err) => Actions.noOp())
}

export default function(state, action){

  if (state === undefined) {
    state = Immutable.fromJS({
      username: ''
    })
  }

  switch (action.type) {
    case 'ATTEMPT_LOGIN':
      return state
    case 'LOGGED':
      return state
    default:
      return state
  }
}