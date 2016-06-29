import React, { Component, } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';

class TopicScreen extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.topic.title}</Text>
        <Text style={styles.title}>{this.props.topic.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TopicScreen
