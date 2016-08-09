import React, { Component } from 'react';
import { View, WebView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import Button from 'react-native-button';
import { Actions as RouterActions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
    flex: 1,
    flexDirection: 'column',
  },
  videoContainer: {
  },
  video: {
    marginTop: 46,
    height: 212,
  },
  description: {
    flex: 3,
  },
});

class DripScreen extends Component {
  static propTypes = {
    drip: React.PropTypes.object
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      paused: true,
    };
    this.togglePaused = (() => {
      this.setState({ paused: !this.state.paused });
    });
    RouterActions.refresh({ title: this.props.drip.title });
  }

  render() {
    const drip = this.props.drip || {};
    let html = '';

    html += '<html><head>';
    html += "<link rel='stylesheet' type='text/css' href='drip.css' />";
    html += "<link rel='stylesheet' type='text/css' href='monokai-sublime.css' />";
    html += "<script src='highlight.pack.js'></script>";
    html += "<script src='jquery.min.js'></script>";
    html += "<script src='fix_redcarpet_syntax_highlighting_indentation.js'></script>";
    html += '</head><body>';
    html += drip.description_html;
    html += '<script>$("pre code").prettyPre(); hljs.initHighlightingOnLoad();</script>';
    html += '</body></html>';

    let pauseText = this.state.paused ? 'Play' : 'Pause';

    let controls = (
      <Button onPress={this.togglePaused}>
        {pauseText}
      </Button>
    );

    let video = drip.video.url ? (
      <View style={styles.videoContainer}>
        <Video style={styles.video}
          source={{ uri: drip.video.url }}
          paused={this.state.paused}
        />
        {controls}
      </View>
    ) : (<View />);
    return (
      <View style={styles.container}>
        {video}
        <WebView
          style={styles.description}
          source={{
            html,
            baseUrl: 'web',
          }}
        />
      </View>
    );
  }
}


const mapStateToProps = function mapStateToProps(state) {
  return {
    drip: state.drip,
  };
};

const ConnectedDripScreen = connect(mapStateToProps)(DripScreen);

// export default DripScreen
export default ConnectedDripScreen;
