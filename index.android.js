import React, { Component, } from 'react'

import {
  AppRegistry,
  Navigator,
  ScrollView,
  ToolbarAndroid,
  TouchableOpacity,
  BackAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import createLogger from 'redux-logger'
//import App from './components/App.js'

// https://www.materialui.co/colors
const Blue600 = '#039BE5';
const Amber600 = '#FFB300';

import {
  setTheme,
  MKColor,
  MKButton
} from 'react-native-material-kit'

// customize the material design theme
setTheme({
  primaryColor: Blue600,
  accentColor: Amber600
})

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
let store = createStoreWithMiddleware(reducers)

function renderHome(navigator) {
  return (
    <View style={styles.container}>
    <Home navigator={navigator} />
    <ToolbarAndroid
    style={styles.toolbar}
    title="Examples"
    />
    </View>
  )
}

function renderScreen(route, navigator) {
  return (
    <View style={styles.container}>
      <route.component
        {...route.passProps}
        navigator={navigator}
      />
      <ToolbarAndroid
        style={styles.toolbar}
        title={route.title}
        navIcon={require('./img/ic_back.png')}
        onIconClicked={() => navigator.pop()}
      />
    </View>
  )
}

class Topics extends Component {
  render() {
    return (
      <View>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
        <Text>zomg topics</Text>
      </View>
    )
  }
}

class Home extends Component {
  render() {
    const TopicsButton = MKButton.coloredButton()
      .withText('Topics')
      .withOnPress(() => {
        this.props.navigator.push({
          title: 'Topics',
          component: Topics,
        })
      })
      .build();

    return (
      <View style={styles.list}>
        <TopicsButton style={styles.button} />
      </View>
    )
  }
}

class AndroidApp extends Component {
  routes(route, navigator) {
    this.navigator = navigator
    //console.log('routing to:', route)
    switch (route.name) {
      case 'home':
        return renderHome(navigator)
      default:
        return renderScreen(route, navigator)
    }
  }

  hardwareBackPress() {
    if (!this.navigator) {
      return false
    }

    let currentRoutes = this.navigator.getCurrentRoutes()
    if (currentRoutes[currentRoutes.length - 1].name !== 'home') {
      // if not on main screen
      // go back to main screen
      this.navigator.popToTop()
      return true
    }
    // else minimize the application
    return false
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => { this.hardwareBackPress })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => { this.hardwareBackPress })
  }

  render() {
    return (
      <Navigator
      initialRoute={{name: 'home'}}
      renderScene={this.routes}
      />
    )
  }
}

class Project extends Component {
  render() {
    return (
      <Provider store={store}>
        <AndroidApp />
      </Provider>
    )
  }
}

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'rgba(245,252,255,.98)',
    height: 56,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  list: {
    backgroundColor: '#F5FCFF',
    paddingTop: 64,
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20, marginBottom: 0,
  },
  pushLabel: {
    padding: 10,
    color: '#2196F3',
    textAlign: 'center',
  },
  button: {
    width: 100,
    alignItems: 'center',
    padding: 10
  }
});

AppRegistry.registerComponent('Project', () => Project)
