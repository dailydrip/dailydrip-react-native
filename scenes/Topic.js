import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'

class Topic extends Component {
  static propTypes = {
    topic: PropTypes.object
  }
  render() {
    console.log("rendering from Topic")
    return (
      <View>
        <Text>ZOMG THIS IS THE {this.props.topic.title} topic!</Text>
      </View>
    )
  }
}

export default Topic
