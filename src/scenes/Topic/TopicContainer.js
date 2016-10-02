import Topic from './index'
import { connect } from 'react-redux'
import API from '../../api'
import Actions from '../../actions'
import Immutable from 'immutable'

const mapStateToProps = (state) => {
  const topics = state.get('topics')
  const selectedTopic = state.get('selectedTopic')
  console.log('selectedTopic', selectedTopic)
  console.log('topics', topics.toJS())
  return {
    topic: topics.get(selectedTopic.get('id')),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDrips: (topicId) => {
      API.getDrips(topicId).then((response) => {
        const dripsMap = response.data.drips.reduce((acc, drip) => {
          return acc.set(drip.id, Immutable.fromJS(drip))
        }, Immutable.Map())
        dispatch(Actions.setDrips(topicId, dripsMap))
      }).catch((error) => {
        console.log(error)
      })
    },
  }
}

const ConnectedTopic = connect(mapStateToProps, mapDispatchToProps)(Topic)

export default ConnectedTopic
