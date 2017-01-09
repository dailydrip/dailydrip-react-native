import { connect } from 'react-redux'
import Topics from './index'
import { Actions } from '../../actions'

const mapStateToProps = (state) => {
  const topics = state.get('topics')
  return {
    topics,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectTopic: (topic) => {
      dispatch(Actions.selectTopic(topic.id))
    },
    logOut: () => {

    },
  }
}

const ConnectedTopics = connect(mapStateToProps, mapDispatchToProps)(Topics)

export default ConnectedTopics
