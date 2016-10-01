// @flow
import React from 'react'

import {
  AppRegistry,
} from 'react-native'

import { Provider } from 'react-redux'
import store from './store'

import App from './components/App.android.js'

const Project = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent('Project', () => Project)
