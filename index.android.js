import React, { Component } from 'react'

import {
  AppRegistry,
  Text,
  View,
  Navigator,
  DrawerLayoutAndroid
} from 'react-native'

import { Provider } from 'react-redux'
import store from './store'

import App from './components/App.android.js'

class Project extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Project', () => Project)
