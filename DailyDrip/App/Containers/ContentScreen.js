import React from 'react'
import { ScrollView,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Text,
  Image,
  View,
  ListView,
  Platform,
  Button,
  WebView } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Card, Text as TextElements } from 'react-native-elements'
import { Images } from '../Themes'
import WebViewDailyDrip from '../Components/WebViewDailyDrip'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/ContentScreenStyles'

var totalWidth = Dimensions.get('window').width
var totalHeight = Dimensions.get('window').height

var styleVideo = StyleSheet.create({
  backgroundVideo: {
    top: 0,
    height: 200,
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

    let fullScreenButton = (<TouchableHighlight onPress={()=> this.fullScreen()}>
              <Icon name='arrows-alt' size={30} color='black' />
            </TouchableHighlight>)

    let playStopIcon = this.state.pauseVideo ? <Icon name='play' size={30} color='black' /> : <Icon name='stop' size={30} color='black' />
    let fullScreen = Platform.OS === 'ios' ? fullScreenButton : null

    return (
      <View>
        <Video source={{uri: url, mainVer: 1, patchVer: 0}} // Looks for .mp4 file (background.mp4) in the given expansion version.
         rate={1.0}
         ref={"videoPlayer"}
         resizeMode='contain'
         style={styleVideo.backgroundVideo}
         volume={1.0}
         paused={this.state.pauseVideo}
         muted={false} />
         <View style={[styles.rowLine, styles.justifyCenter]}>
            <TouchableHighlight onPress={()=> this.pause()}>
              {playStopIcon}
            </TouchableHighlight>

            {fullScreen}
          </View>
      </View>)
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

    return (
      <View style={{flex: 1}}>
        <Text>{title}</Text>
        {video}
        <WebViewDailyDrip html={description_html} height={totalHeight} width={totalWidth} />
      </View>
    )
  }
}
