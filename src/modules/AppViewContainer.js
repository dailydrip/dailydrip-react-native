import { connect } from 'react-redux'
import AppView from './AppView'
import Immutable from 'immutable'
import Actions from '../actions'
import API from '../api'

export default connect(
  () => { return {} },
  dispatch => {
    return {
      fetchTopics: () => {
        API.getTopics().then((response) => {
          const topicsMap = response.data.topics.reduce((acc, topic) => {
            return acc.set(topic.id, Immutable.fromJS(topic))
          }, Immutable.Map())
          dispatch(Actions.setTopics(topicsMap))
        }).catch((error) => {
          console.log(error)
        })
      },
    }
  }
)(AppView)
