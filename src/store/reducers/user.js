import Immutable from 'immutable'
import { Actions, UPDATE_USER_INFORMATION, FETCH_USER_INFORMATION } from '../../actions'
import { loop, Effects } from 'redux-loop';
import API from '../../api'


let fetchUserInformation = () => (
  API.getUserInformation()
    .then((response) => {
      return Actions.setUserInformation(
        response.data.name,response.data.email
      )
    })
    .catch((err) => {
      console.error(err)
      return Actions.noOp()
    })
)

let updateUserInformation = (user) => (
  API.updaUserInformation(user)
    .then((response) => {
      return Actions.updatedUserInformation()
    })
    .catch((err) => {
      return Actions.errorUpdatingUserInformation()
    })
)

export default function(state, action){
  switch (action.type) {
    case FETCH_USER_INFORMATION:
      return loop(
        state,
        Effects.promise(fetchUserInformation)
      )
    case UPDATE_USER_INFORMATION:
      user = new User(name: action.payload[0], email: action.payload[2])
      return loop(
        user,
        Effects.promise(updateUserInformation(user))
      )

  default:
    return loop(
      state,
      Effects.none()
    )
  }
}
