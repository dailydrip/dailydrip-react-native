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
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
    } else {
      return 0
    }
  }

  togglePaused() {
    this.setState({ paused: !this.state.paused })
  }

  render() {
    const drip = this.props.drip || {}
    let html = ''

    html += '<html><head>'
    html += "<link rel='stylesheet' type='text/css' href='drip.css' />"
    html += "<link rel='stylesheet' type='text/css' href='monokai-sublime.css' />"
    html += "<script src='highlight.pack.js'></script>"
    html += "<script src='jquery.min.js'></script>"
    html += "<script src='fix_redcarpet_syntax_highlighting_indentation.js'></script>"
    html += '</head><body>'
    html += drip.description_html
    html += '<script>$("pre code").prettyPre(); hljs.initHighlightingOnLoad();</script>'
    html += '</body></html>'

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
