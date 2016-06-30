import React, { Component, } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../actions'
import API from '../../api/DailyDripApi'

class DripScreen extends Component {
  static propTypes = {}

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const drip = this.props.drip || {}
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{drip.title}</Text>
        <Text style={styles.description}>{drip.description}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60
  },
  title: {
    fontSize: 20
  }
});

let mapStateToProps = function mapStateToProps(state){
  return {
    drip: state.drip
  }
}

let ConnectedDripScreen = connect(mapStateToProps)(DripScreen)

//export default DripScreen
export default ConnectedDripScreen
