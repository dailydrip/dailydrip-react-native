import Topic from './index'
import { connect } from 'react-redux'
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
      dispatch(Actions.fetchDrips(topicId))
    },
  }
}

const ConnectedTopic = connect(mapStateToProps, mapDispatchToProps)(Topic)

export default ConnectedTopic
