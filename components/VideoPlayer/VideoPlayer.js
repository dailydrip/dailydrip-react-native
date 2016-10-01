import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Video from 'react-native-video'
import Button from 'react-native-button'

const styles = StyleSheet.create({
  videoContainer: {
  },
  video: {
    marginTop: 46,
    height: 212,
  },
})

class VideoPlayer extends Component {
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {
      paused: true,
      currentTime: 0.0,
      duration: 0.0,
    }
    this.onProgress = this.onProgress.bind(this)
    this.togglePaused = this.togglePaused.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime })
  }

  onLoad(data) {
    this.setState({ duration: data.duration })
  }

  getCurrentTimePercentage() {
    let timePercentage
    if (this.state.currentTime > 0) {
      timePercentage = parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
    } else {
      timePercentage = 0
    }
    return timePercentage
  }

  togglePaused() {
    this.setState({ paused: !this.state.paused })
  }

  render() {
    let pauseText = this.state.paused ? 'Play' : 'Pause'

    let flexCompleted = this.getCurrentTimePercentage() * 100
    let flexRemaining = (1 - this.getCurrentTimePercentage()) * 100

    let controls = (
      <View>
        <Button onPress={this.togglePaused}>
          {pauseText}
        </Button>
        <Text>{flexCompleted} / {flexRemaining}</Text>
      </View>
    )

    return (
      <View style={styles.videoContainer}>
        <Video
          style={styles.video}
          source={this.props.source}
          paused={this.state.paused}
          onProgress={this.onProgress}
          onLoad={this.onLoad}
        />
        {controls}
      </View>
    )
  }
}

export default VideoPlayer
