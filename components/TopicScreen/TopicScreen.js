import React, { Component, } from 'react'
import { View, TouchableHighlight, ListView, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../actions'
import { Actions as RouterActions } from 'react-native-router-flux';
import API from '../../api/DailyDripApi'

class DripCard extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let cardStyles = StyleSheet.create({
      container: {
          padding: 10
      },
      title: {
        fontSize: 20,
        textAlign: 'left'
      }
    })
    let {title, teaser} = this.props.drip;
    return (
      <View style={cardStyles.container}>
        <Text style={cardStyles.title}>{title}</Text>
        <Text>{teaser}</Text>
      </View>
    )
  }
}

class TopicScreen extends Component {
  static propTypes = {}

  static defaultProps = {
    fetchDrips: function(){},
    onPress: function(){}
  }

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.drips)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.drips)
    })
  }

  componentDidMount(){
    this.props.fetchDrips(this.props.topic.id)
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
         style={styles.row}
         onPress={() => {
           this.props.onPress(rowData)
           RouterActions.dripScreen()
         }}>
         <View>
           <DripCard drip={rowData}></DripCard>
         </View>
      </TouchableHighlight>
    )
  }

  render() {
    const drips = this.props.drips || []
    return (
      <View style={styles.container}>
        <ListView
          style={styles.items}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1
  },
  items: {
    padding: 10,
    height: 20,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
});

let mapStateToProps = function mapStateToProps(state){
  return {
    drips: state.drips
  }
}

let mapDispatchToProps = function mapDispatchToProps(dispatch){
  return {
    fetchDrips: (topicId) => {
      API.getDrips(topicId).then((data) => {
        dispatch(Actions.setDrips(data.data.drips))
      }).catch((error) => {
         console.log(error)
        })
    },
    onPress: (drip) => {
      // NOTE: This should really just set the dripID, and it should reduce to the right one
      dispatch(Actions.setDrip(drip))
    }
  }
}

let ConnectedTopicScreen = connect(mapStateToProps, mapDispatchToProps)(TopicScreen)

//export default TopicScreen
export default ConnectedTopicScreen
