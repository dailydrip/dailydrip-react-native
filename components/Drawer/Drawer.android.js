import React, { PropTypes, Component } from 'react'

import {
  AppRegistry,
  Text,
  View,
  Navigator,
  DrawerLayoutAndroid
} from 'react-native'

import { connect } from 'react-redux'
import { Drawer as MDrawer, Ripple, Button, Card } from 'react-native-material-design'

class Drawer extends Component {
  static propTypes = {
    topics: PropTypes.arrayOf(
      PropTypes.shape(
        {
          title: PropTypes.string.isRequired,
        }
      )
    )
  }

	constructor(props) {
		super(props)
	}

  getTopicItems() {
    return this.props.topics.map((topic) => {
      return {
        icon: 'face',
        value: topic.title,
        label: '3',
        active: false,
        onPress: () => {},
        onLongPress: () => {}
      }
    })
  }

  render() {
    let topicItems = this.getTopicItems()

    return (
      <MDrawer theme='light'>
        <MDrawer.Section
          items={topicItems}
        >
        </MDrawer.Section>
      </MDrawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const ConnectedDrawer = connect(mapStateToProps, mapDispatchToProps)(Drawer);

export default ConnectedDrawer
