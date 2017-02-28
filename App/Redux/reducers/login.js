import Immutable from 'immutable'
import { Actions, SET_TOPICS, SET_DRIPS, FETCH_TOPICS, FETCH_DRIPS } from '../actions'
import { loop, Effects } from 'redux-loop';
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
  switch (action.type) {
    case 'ATTEMPT_LOGIN':
      return loop(
        state,
        Effects.promise(attemptLogin, action.username, action.password)
      )
    case 'LOGGED':
      return loop(
        state.set('username', action.username),
        Effects.none()
      )
    default:
      return state
  }
}
