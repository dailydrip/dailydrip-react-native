import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable'
import { SELECT_TOPIC } from '../../actions'

export default createReducer(Immutable.Map(), {
  [SELECT_TOPIC]: (state, { topicId }) => state.set('id', topicId),
})
