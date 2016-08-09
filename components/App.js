import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import MainScreen from './MainScreen/MainScreen';
import TopicScreen from './TopicScreen/TopicScreen';
import DripScreen from './DripScreen/DripScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import LoginScreen from './LoginScreen/LoginScreen';
import Drawer from './Drawer/Drawer';

class App extends Component {
  static propTypes = {}
  static defaultProps = {}

  render() {
    return (
      <Router>
        <Scene key="drawer" component={Drawer} open={false} >
          <Scene key="root">
            <Scene key="mainScreen" component={MainScreen} title="" initial />
            <Scene key="topicScreen" component={TopicScreen} title="" />
            <Scene key="dripScreen" component={DripScreen} title="" />
            <Scene key="settingsScreen" component={SettingsScreen} title="" />
            <Scene key="loginScreen" component={LoginScreen} title="" hideNavBar />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
