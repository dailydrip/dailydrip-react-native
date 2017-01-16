// @flow
import React, { Component } from 'react'
import 'es6-symbol/implement'

import {
  AppRegistry,
} from 'react-native'

import { Provider } from 'react-redux'
import store, { storageLoader } from './src/store'

import AppViewContainer from './src/modules/AppViewContainer'

class DailyDrip extends Component {
  componentWillMount() {
    // Load existing store state from async storage
    // console.log('loading storage')
    // storageLoader(store)
    //     .then((newState) => console.log('Loaded state:', newState))
    //     .catch((e) => console.log('Failed to load previous state', e))
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('DailyDrip', () => DailyDrip)
