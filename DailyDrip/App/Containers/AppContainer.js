import React, { Component } from 'react'
import { View, StatusBar, AsyncStorage } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/RootContainerStyles'

class AppContainer extends Component {

  componentWillMount() {
    this.checkAuth()
  }

  checkAuth = () =>{
    AsyncStorage.getItem('auth_token').then((value) => {
      if (value) {
        console.log('Logged, going to the feed')
        NavigationActions.feedScreen()
      }else{
        console.log('not logged')
        NavigationActions.loginScreen()
      }
    })
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(AppContainer)
