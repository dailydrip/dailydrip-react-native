import Drip from './index'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  const topics = state.get('topics')
  const selectedTopic = state.get('selectedTopic')
  const topic = topics.get(selectedTopic.get('id'))
  const drips = topic.get('drips')
  const drip = drips.get(ownProps.id)
  return {
    topic,
    drip,
  }
}

const mapDispatchToProps = () => {
  return {}
}

const ConnectedDrip = connect(mapStateToProps, mapDispatchToProps)(Drip)

export default ConnectedDrip
