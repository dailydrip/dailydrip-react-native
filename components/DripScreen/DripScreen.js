import React, { Component } from 'react';
import { View, WebView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  video: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  description: {
  },
});

class DripScreen extends Component {
  static propTypes = {
    drip: React.PropTypes.object,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
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

    let video = drip.video.url ? (
      <Video
        style={styles.video}
        source={{ uri: drip.video.url }}
      />
    ) : (<View />);
    return (
      <View style={styles.container}>
        {video}
        <Text style={styles.title}>{drip.title}</Text>
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
