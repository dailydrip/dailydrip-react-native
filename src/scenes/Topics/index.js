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
  ListView,
  Platform,
  TouchableHighlight,
} from 'react-native'

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
  iconContainer: {
    width: iconWidth,
    height: iconWidth,
    borderRadius: iconWidth / 2,
    backgroundColor: color.googleBlue500.color,
    marginRight: 30,
  },
  titleText: {
    color: ecstasy,
    fontSize: 20,
    flex: 1,
  },
  titleRuler: {
    height: 1,
    backgroundColor: '#ff0000',
  },
  description: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'flex-start',
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
              <Text>foo</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.titleText}>{topic.title}</Text>
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
