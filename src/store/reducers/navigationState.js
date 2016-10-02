import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'
import { PUSH_ROUTE, POP_ROUTE } from '../../actions'
import { NavigationExperimental } from 'react-native'

const { StateUtils: NavigationStateUtils } = NavigationExperimental

export default createReducer([], {
  [PUSH_ROUTE]: (state, action) => {
    const route = action.payload
    const scenes = state.toJS()
    let nextScenes

    try {
      nextScenes = NavigationStateUtils.push(scenes, route)
    } catch (e) {
      nextScenes = scenes
    }
    return Immutable.fromJS(nextScenes)
  },
  [POP_ROUTE]: (state) => {
    const scenes = state.toJS()
    const nextScenes = NavigationStateUtils.pop(scenes)
    return Immutable.fromJS(nextScenes)
  },
})
