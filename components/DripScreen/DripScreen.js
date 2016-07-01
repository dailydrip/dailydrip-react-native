import React, { Component, } from 'react'
import { ScrollView, View, WebView, Text, StyleSheet } from 'react-native'
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
    console.log(drip)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{drip.title}</Text>
        <WebView style={styles.description} source={ { html: drip.description_html, baseUrl: "https://www.dailydrip.com/" } } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1
  },
  title: {
    fontSize: 20
  },
  description: {
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
