import React, { Component, } from 'react'

import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import App from './components/App.js';

class DailyDrip extends Component {
  render() {
    return (
      <View>
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('DailyDrip', () => DailyDrip);
