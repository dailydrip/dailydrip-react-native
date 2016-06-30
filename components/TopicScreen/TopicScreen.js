import React, { Component, } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../../actions'
import API from '../../api/DailyDripApi'

class DripCard extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Text>this is a drip</Text>
    )
  }
}

class TopicScreen extends Component {
  static propTypes = {}

  static defaultProps = {
    fetchDrips: function(){}
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.fetchDrips(this.props.topic.id)
  }

  render() {
    const drips = this.props.drips || []
    let dripViews = drips.map((drip,i) => {
      return <DripCard key={i} drip={drip}></DripCard>
    })
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.topic.title}</Text>
        <Text style={styles.title}>{this.props.topic.description}</Text>
        { dripViews }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
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
        debugger
        dispatch(Actions.setDrips(data.data.drips))
      }).catch((error) => { console.log(error) })
    }
  }
}

let ConnectedTopicScreen = connect(mapStateToProps, mapDispatchToProps)(TopicScreen)

//export default TopicScreen
export default ConnectedTopicScreen
