import React, { Component, } from 'react'

import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import App from './components/App.js';

let store = createStore(reducers)

class Project extends Component {
  render() {
    return (
      <View>
        <Provider store={store}>
          <App />
        </Provider>
      </View>
    );
  }
}

AppRegistry.registerComponent('Project', () => Project);
