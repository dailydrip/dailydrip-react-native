import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import API from '../api/DailyDripApi'
import { connect } from 'react-redux'
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'

import {
  View,
  WebView,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'

class Drip extends Component {
  static propTypes = {
    id: PropTypes.number,
    drip: ImmutablePropTypes.map,
    navigate: PropTypes.object,
  }

  render() {
    const { drip } = this.props
    let html = ''

    html += '<html><head>'
    html += "<link rel='stylesheet' type='text/css' href='drip.css' />"
    html += "<link rel='stylesheet' type='text/css' href='monokai-sublime.css' />"
    html += "<script src='highlight.pack.js'></script>"
    html += "<script src='jquery.min.js'></script>"
    html += "<script src='fix_redcarpet_syntax_highlighting_indentation.js'></script>"
    html += '</head><body>'
    html += drip.get('description_html')
    html += '<script>$("pre code").prettyPre(); hljs.initHighlightingOnLoad();</script>'
    html += '</body></html>'


    const video = drip.get('video').get('url') ? (
      <VideoPlayer source={{ uri: drip.get('video').get('url') }} />
    ) : (<View />)
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
})

const mapStateToProps = (state, ownProps) => {
  const topics = state.get('topics')
  const selectedTopic = state.get('selectedTopic')
  const topic = topics.get(selectedTopic.get('id'))
  const drips = topic.get('drips')
  const drip = drips.get(ownProps.id)
  return {
    topic,
    drip,
  }
}

const mapDispatchToProps = () => {
  return {}
}

const ConnectedDrip = connect(mapStateToProps, mapDispatchToProps)(Drip)

export default ConnectedDrip
