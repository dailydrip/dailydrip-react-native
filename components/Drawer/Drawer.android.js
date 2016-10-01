import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

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
    drawerWrapper: PropTypes.object.isRequired,
    navigate: PropTypes.object.isRequired,
    topics: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        title: PropTypes.string.isRequired,
      })
    ).isRequired
  }

	constructor(props) {
		super(props)
	}

  getTopicItems() {
    let { navigate, drawerWrapper } = this.props
    return this.props.topics.map((topic) => {
      return {
        icon: 'face',
        value: topic.get('title'),
        label: '3',
        active: false,
        onPress: () => {
          navigate.to('topic', topic.get('title'), {topic: topic})
          drawerWrapper.closeDrawer()
        },
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
  console.log("mapStateToProps")
  console.log(state.toJS())
  return {
    topics: state.get("topics"),
  };
};

const mapDispatchToProps = () => {
  return {};
};

const ConnectedDrawer = connect(mapStateToProps, mapDispatchToProps)(Drawer);

export default ConnectedDrawer
