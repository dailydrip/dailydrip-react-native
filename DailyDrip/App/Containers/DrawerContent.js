import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid, TouchableHighlight, Text, AsyncStorage  } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
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

  logout = () => {
    AsyncStorage.clear()
    NavigationActions.loginScreen()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <TouchableHighlight onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
