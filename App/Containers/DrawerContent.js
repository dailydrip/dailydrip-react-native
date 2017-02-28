// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  onPressDrawerButton = () => {
    this.toggleDrawer()
    NavigationActions.listviewExample()
  }

  render () {
    const { topics } = this.props;

    const buttonsRendered = topics.map((topic, id)=> {
      let title = topic.get('title')
      let description = topic.get('description')
      let dripCount = topic.get('drip_count')

      return(<DrawerButton text={title} onPress={this.onPressDrawerButton} />)
    })

    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        {buttonsRendered}
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    topics: state.get('topics')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopics: () => { dispatch(Actions.fetchTopics()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
