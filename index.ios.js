import React, { Component, } from 'react'

import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import App from './components/App.js';

class Project extends Component {
  render() {
    return (
      <View>
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('Project', () => Project);
