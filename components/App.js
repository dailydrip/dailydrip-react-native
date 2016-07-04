import React, { Component, } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Router, Scene, DefaultRenderer } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';

import MainScreen from './MainScreen/MainScreen'
import TopicScreen from './TopicScreen/TopicScreen'
import DripScreen from './DripScreen/DripScreen'
import SettingsScreen from './SettingsScreen/SettingsScreen'
import LoginScreen from './LoginScreen/LoginScreen'
import TabView from './TabView/TabView'
import variables from './variables'

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#ff0000",
  },
});

export class DrawerDailyDrip extends Component {
  render() {
    const state = this.props.navigationState
    const children = state.children

    return (
            <Drawer
              ref="navigation"
              open={state.open}
              type="displace"
              content={<TabView />}
              tapToClose
              openDrawerOffset={0.6}
              panCloseMask={0.2}
              negotiatePan
              styles={{
                main: {
                  backgroundColor: variables.dodgerBlue,
                  shadowColor: '#000000',
                  shadowOpacity: 0.3,
                  shadowRadius: 15
                },
                drawer: {
                  backgroundColor: variables.dodgerBlue,
                  top: 0
                }
              }}
              tweenHandler={(ratio) => ({
                main: { opacity: Math.max(0.54, 1 - ratio) },
              })}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
  }
}


class App extends Component {
  static propTypes = {}
  static defaultProps = {}

  render() {
    return (
	    <Router>
        <Scene key="drawer" component={DrawerDailyDrip} open={false} >
  	      <Scene key="root">
  	        <Scene key="mainScreen" component={MainScreen} title="" initial />
            <Scene key="topicScreen" component={TopicScreen} title="" />
            <Scene key="dripScreen" component={DripScreen} title="" />
            <Scene key="settingsScreen" component={SettingsScreen} title="" />
            <Scene key="loginScreen" component={LoginScreen} title="" hideNavBar={true} />
  	      </Scene>
        </Scene>
	    </Router>
    )
  }
}

export default App
