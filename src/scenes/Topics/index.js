import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import _ from 'lodash'
import Immutable from 'immutable'
import { color } from 'react-native-material-design-styles'
import { ecstasy } from '../../utils/colors'

const iconWidth = 40

import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native'

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  iconContainer: {
    width: iconWidth,
    height: iconWidth,
    borderRadius: iconWidth / 2,
    backgroundColor: color.googleBlue500.color,
    marginRight: 20,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
  },
  titleText: {
    color: ecstasy,
    fontSize: 20,
    marginRight: 10,
  },
  titleRuler: {
    height: 1,
    flex: 1,
    marginTop: 14,
    backgroundColor: color.googleBlue500.color,
  },
  description: {
    paddingRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
})

class Topics extends Component {
  static propTypes = {
    topics: ImmutablePropTypes.map.isRequired,
    navigate: PropTypes.object,
    selectTopic: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectTopic() {},
  }

  constructor(props) {
    super(props)
    const { topics } = this.props
    const topicsList = _.map(topics.toJS(), topic => topic)
    this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    this.state = {
      dataSource: this.ds.cloneWithRows(topicsList),
    }
    this.renderRow = this.renderRow.bind(this)
  }

  navigateToTopic(topic) {
    const { navigate } = this.props
    navigate.to('topic', topic.title, { id: topic.id })
  }

  renderRow(topic) {
    let onPress = () => {
      const { selectTopic, navigate } = this.props
      selectTopic(topic)
      navigate.to('topic', topic.title, { topic: Immutable.fromJS(topic) }) // TODO: We will want to switch to NavigationExperimental sigh :)  This should be declarative "data-down" style or I'll cry forever
    }

    return (
      <View>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Image source={{ uri: 'https://www.dailydrip.com/assets/topic_logos/elm_white-e9f362eb364072ada231cf45c9cbeb5630c81708b33cca6223b75d3bf8c01b34.png' }} />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>{topic.title}</Text>
                <View style={styles.titleRuler} />
              </View>
              <Text style={styles.description} numberOfLines={3}>{topic.description}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <ListView
        styles={styles.scrollView}
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={this.renderRow}
      />
    )
  }
}

export default Topics
