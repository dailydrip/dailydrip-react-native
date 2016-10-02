import React, { PropTypes, Component } from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import API from '../api'
import Actions from '../actions'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { color } from 'react-native-material-design-styles'

import {
  View,
  Text,
  StyleSheet,
  ListView,
  Platform,
} from 'react-native'

import {
  Card,
} from 'react-native-material-design'

const styles = StyleSheet.create({
  cardTitleContainer: {
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    backgroundColor: color.googleBlue500.color,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  cardTitleIdentifier: {
    color: white,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Normal',
  },
  cardTitleText: {
    color: white,
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Montserrat-Thin',
    marginBottom: 10,
  },
  cardBody: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  cardTeaserText: {
    fontSize: 16,
  },
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


class Topic extends Component {
  static propTypes = {
    topic: ImmutablePropTypes.map.isRequired,
    fetchDrips: PropTypes.func,
    navigate: PropTypes.object,
  }

  static defaultProps = {
    fetchDrips() {},
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
      dataSource: this.ds.cloneWithRows(drips),
    })
  }

  getDripsFromProps(props) {
    const { topic } = props
    return topic.get('drips') ? topic.get('drips').toJS() : []
  }


  navigateToDrip(drip) {
    const { navigate } = this.props
    navigate.to('drip', drip.title, { id: drip.id })
  }

  renderRow(rowData) {
    return (
      <View style={styles.item}>
        <Card
          style={{ paddingLeft: 0, paddingRight: 0 }}
          onPress={() => this.navigateToDrip(rowData)}
        >
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitleIdentifier}>{rowData.identifier}</Text>
            <Text style={styles.cardTitleText}>{rowData.title}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTeaserText}>{rowData.teaser}</Text>
          </View>
        </Card>
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

const mapStateToProps = (state) => {
  const topics = state.get('topics')
  const selectedTopic = state.get('selectedTopic')
  console.log('selectedTopic', selectedTopic)
  console.log('topics', topics.toJS())
  return {
    topic: topics.get(selectedTopic.get('id')),
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
  }
}

const ConnectedTopic = connect(mapStateToProps, mapDispatchToProps)(Topic)

export default ConnectedTopic
