import React from 'react'
import { ScrollView,StyleSheet, Dimensions, Text, Image, View, ListView, Button, WebView } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Card, Text as TextElements } from 'react-native-elements'
import { Images } from '../Themes'
import WebViewDailyDrip from '../Components/WebViewDailyDrip'
import Video from 'react-native-video'

// Styles
import styles from './Styles/ContentScreenStyles'

var totalWidth = Dimensions.get('window').width
var totalHeight = Dimensions.get('window').height

var styleVideo = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    height: 300,
    width: totalWidth,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default class ContentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pauseVideo: true
    }
  }

  renderVideo = (url) => {
    return <Video source={{uri: url, mainVer: 1, patchVer: 0}} // Looks for .mp4 file (background.mp4) in the given expansion version.
       rate={1.0}
       ref={"videoPlayer"}
       style={styleVideo.backgroundVideo}
       volume={1.0}
       paused={this.state.pauseVideo}
       muted={false} />
  }

  pause = () => {
    this.state.pauseVideo ? this.setState({pauseVideo: false }) : this.setState({pauseVideo: true })
  }

  fullScreen = () => {
    this.refs.videoPlayer.presentFullscreenPlayer()
  }

  render () {
    const {title, teaser, description_html } = this.props.drip
    let videoUrl = this.props.drip.video.url
    let video = videoUrl  ? this.renderVideo(this.props.drip.video.url) : null
    let marginTop = videoUrl ? 200 : 0
    // const { description, title } = this.props
    return (
      <ScrollView style={styles.container}>
        <Text>{title}</Text>
        {video}
        <Button title="STOP" onPress={() => this.pause()} />
        <Button title="FULL SCREEN" onPress={() => this.fullScreen()} />
        <WebViewDailyDrip html={description_html} marginTop={marginTop} height={totalHeight} width={totalWidth} />
      </ScrollView>
    )
  }
}
