import React, { Component, } from 'react'

import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import createLogger from 'redux-logger'
import App from './components/App.js';

import { setTheme, MKColor } from 'react-native-material-kit';

// customize the material design theme
setTheme({
  primaryColor: MKColor.palette_blue_600,
  accentColor: MKColor.Amber,
});

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
let store = createStoreWithMiddleware(reducers)

class Project extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Project', () => Project);
