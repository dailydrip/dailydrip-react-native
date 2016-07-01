import React, { Component, } from 'react'
import { ScrollView, View, WebView, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../actions'
import API from '../../api/DailyDripApi'
import Video from 'react-native-video'

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
    let video = drip.video.url ? (
        <Video style={styles.video}
            source={{uri: drip.video.url}}
        />
    ) : (<View></View>)
    return (
      <View style={styles.container}>
        {video}
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
  video: {
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
