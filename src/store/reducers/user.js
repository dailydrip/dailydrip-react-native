import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'
import {
  Actions,
  UPDATE_USER_INFORMATION,
  FETCH_USER_INFORMATION,
  GOT_USER_INFORMATION,
  SET_USER_NAME,
  SET_USER_EMAIL,
} from '../../actions'
import { loop, Effects } from 'redux-loop';
import API from '../../api'

let fetchUserInformation = () => (
  API.getUserInformation()
    .then((response) => {
      return Actions.gotUserInformation(
        response.name,
        response.email
      )
    })
    .catch((err) => {
      console.error(err)
      return Actions.noOp()
    })
)

let updateUserInformation = (user) => (
  API.updateUserInformation(user)
    .then((response) => {
      return Actions.updatedUserInformation()
    })
    .catch((err) => {
      return Actions.errorUpdatingUserInformation()
    })
)

export default function reducer(state, action) {
  switch(action.type) {
    case FETCH_USER_INFORMATION:
      return loop(
        state,
        Effects.promise(fetchUserInformation)
      )
    case UPDATE_USER_INFORMATION:
      return loop(
        state,
        Effects.promise(updateUserInformation(state))
      )
    case GOT_USER_INFORMATION:
      return loop(
        state
          .set('name', action.name)
          .set('email', action.email),
        Effects.none()
      )
    case SET_USER_NAME:
      return loop(
        state
          .set('name', action.name),
        Effects.none()
      )
    case SET_USER_EMAIL:
      return loop(
        state
          .set('email', action.email),
        Effects.none()
      )
    default:
      return state
  }
}
