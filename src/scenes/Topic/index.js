import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { color } from 'react-native-material-design-styles'
import { white } from '../../utils/colors'

import {
  View,
  Text,
  StyleSheet,
  ListView,
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
    minHeight: 80,
  },
  cardTeaserText: {
    fontSize: 18,
  },
  scrollView: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
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

export default Topic
