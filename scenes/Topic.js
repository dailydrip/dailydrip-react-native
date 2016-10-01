import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import API from '../api/DailyDripApi'
import Actions from '../actions'
import { connect } from 'react-redux'

import {
  View,
  Text,
  StyleSheet,
  ListView,
  Platform,
} from 'react-native'

import {
  Card
} from 'react-native-material-design'

class Topic extends Component {
  static propTypes = {
    topic: ImmutablePropTypes.map.isRequired,
    fetchDrips: PropTypes.func,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    fetchDrips() {},
    onPress() {},
  }

  getDripsFromProps(props) {
    const { topic } = props
    return topic.get('drips') ? topic.get('drips').toJS() : []
  }

  constructor(props) {
    super(props)
    const drips = this.getDripsFromProps(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    this.state = {
      dataSource: this.ds.cloneWithRows(drips),
    }
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    const { fetchDrips, topic } = this.props
    fetchDrips(topic.get('id'))
  }

  componentWillReceiveProps(nextProps) {
    const drips = this.getDripsFromProps(nextProps)
    this.setState({
      dataSource: this.ds.cloneWithRows(drips)
    })
  }

  renderRow(rowData) {
    return (
      <View style={styles.item}>
        <Card>
          <Card.Body>
            <Text>{rowData.title}</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris sagittis pellentesque lacus eleifend lacinia...
            </Text>
          </Card.Body>
        </Card>
      </View>
    )
      // <TouchableHighlight
      //   style={styles.row}
      //   underlayColor={'white'}
      //   onPress={() => {
      //     this.props.onPress(rowData)
      //     RouterActions.dripScreen()
      //   }}
      // >
      //   <View>
      //     <DripCard drip={rowData} />
      //   </View>
      // </TouchableHighlight>
  }

  render() {
    return (
      <ListView
        styles={styles.scrollView}
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={this.renderRow}
      >
      </ListView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  item: {
    flex: 1,
    marginTop: 4,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
})

const mapStateToProps = (state) => {
  const topics = state.get('topics')
  const selectedTopic = state.get('selectedTopic')
  console.log('selectedTopic', selectedTopic)
  console.log('topics', topics.toJS())
  return {
    topic: topics.get(selectedTopic.get('id'))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDrips: (topicId) => {
      API.getDrips(topicId).then((response) => {
        const dripsMap = response.data.drips.reduce((acc, drip) => {
          return acc.set(drip.id, Immutable.fromJS(drip))
        }, Immutable.Map())
        dispatch(Actions.setDrips(topicId, dripsMap))
      }).catch((error) => {
        console.log(error)
      })
    },
    onPress: (drip) => {
      // NOTE: This should really just set the dripID, and it should reduce to the right one
      dispatch(Actions.setDrip(drip))
    },
  }
}

const ConnectedTopic = connect(mapStateToProps, mapDispatchToProps)(Topic)

export default ConnectedTopic
