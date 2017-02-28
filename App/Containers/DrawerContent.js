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

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  render () {
    const { topics } = this.props;

    const buttonsRendered = topics.map((topic, id)=> {
      let title = topic.get('title')
      let description = topic.get('description')
      let dripCount = topic.get('drip_count')

      return(<DrawerButton text={title} onPress={this.handlePressComponents} />)
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
