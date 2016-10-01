import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import _ from 'lodash'
import Actions from '../../actions'

import { connect } from 'react-redux'
import { Drawer as MDrawer } from 'react-native-material-design'

class Drawer extends Component {
  static propTypes = {
    drawerWrapper: PropTypes.object.isRequired,
    navigate: PropTypes.object.isRequired,
    topics: ImmutablePropTypes.map.isRequired,
  }

  getTopicItems() {
    const { navigate, drawerWrapper, topics } = this.props
    return _.map(topics.toJS(), ((topic) => {
      return {
        icon: 'face',
        value: topic.title,
        label: `${topic.drip_count}`,
        active: false,

        onPress: () => {
          const { selectTopic, navigate } = this.props
          selectTopic(topic)
          navigate.to('topic', topic.title, { topic }) // TODO: We will want to switch to NavigationExperimental sigh :)  This should be declarative "data-down" style or I'll cry forever
          drawerWrapper.closeDrawer()
        },
        onLongPress: () => {},
      }
    }))
  }

  render() {
    let topicItems = this.getTopicItems()

    return (
      <MDrawer theme="light">
        <MDrawer.Section
          items={topicItems} // MDrawer doesn't want ImmutableJS items
        >
        </MDrawer.Section>
      </MDrawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.get('topics'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectTopic: (topic) => {
      dispatch(Actions.selectTopic(topic.id))
    }
  };
};

const ConnectedDrawer = connect(mapStateToProps, mapDispatchToProps)(Drawer);

export default ConnectedDrawer
