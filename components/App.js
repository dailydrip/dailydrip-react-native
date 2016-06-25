import React, { Component, } from 'react'
import { View, Text } from 'react-native'
import { Actions, Router, Scene, DefaultRenderer } from 'react-native-router-flux';
import MainScreen from './MainScreen/MainScreen'


class App extends Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
	    <Router>
	      <Scene key="root">
	        <Scene key="MainScreen" component={MainScreen} title="" initial />
	      </Scene>
	    </Router>
    )
  }
}

export default App