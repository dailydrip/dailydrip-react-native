import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import _ from 'lodash'
import {
  View,
  Text,
} from 'react-native'

class Drawer extends Component {
  static propTypes = {
    drawerWrapper: PropTypes.object.isRequired,
    navigate: PropTypes.object.isRequired,
    topics: ImmutablePropTypes.map.isRequired,
    selectTopic: PropTypes.func.isRequired,
  }

  getTopicItems() {
    const { drawerWrapper, topics } = this.props
    return _.map(topics.toJS(), ((topic) => {
      return {
        icon: 'face',
        value: topic.title,
        label: `${topic.drip_count}`,
        active: false,

        onPress: () => {
          const { selectTopic, navigate } = this.props
          selectTopic(topic)
          navigate.to('topics.topic', topic.title, { topic: Immutable.fromJS(topic) }) // TODO: We will want to switch to NavigationExperimental sigh :)  This should be declarative "data-down" style or I'll cry forever
          drawerWrapper.closeDrawer()
        },
        onLongPress: () => {},
      }
    }))
  }

  render() {
    const topicItems = this.getTopicItems()
    const { drawerWrapper, navigate } = this.props
    const additionalItems = [
      {
        icon: 'face',
        value: 'Topics',
        active: false,
        onPress: () => {
          navigate.to('topics')
          drawerWrapper.closeDrawer()
        },
        onLongPress: () => {},
      },
      {
        icon: 'face',
        value: 'Log Out',
        active: false,
        onPress: () => {
          navigate.to('login')
          drawerWrapper.closeDrawer()
        },
        onLongPress: () => {},
      },
    ]
    const drawerItems = topicItems.concat(additionalItems)
    const drawerItemViews = topicItems.map((topicItem) => {
      return (
        <TouchableHighlight
          onPress={topicItem.onPress}
        >
          <Text>{topicItem.value}</Text>
        </TouchableHighlight>
      )
    })


    return (
      <View>
        {drawerItemViews}
      </View>
    )
  }
}

export default Drawer
