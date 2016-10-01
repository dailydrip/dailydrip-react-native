import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import API from '../api/DailyDripApi'
import { connect } from 'react-redux'

import {
  View,
  Text,
  StyleSheet,
  ListView,
  Platform,
} from 'react-native'

class Drip extends Component {
  static propTypes = {
    id: PropTypes.number,
    drip: ImmutablePropTypes.map,
    navigate: PropTypes.object,
  }

  render() {
    return (
      <View style={styles.continer}>
        <Text>{this.props.drip.get('title')}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
})

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
