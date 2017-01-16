import { connect } from 'react-redux'
import AppView from './AppView'
import Immutable from 'immutable'
import { Actions } from '../actions'
import API from '../api'

export default connect(
  () => { return {} },
  dispatch => {
    return {
      fetchTopics: () => {
        dispatch(Actions.fetchTopics())
      }
    }
  }
)(AppView)
