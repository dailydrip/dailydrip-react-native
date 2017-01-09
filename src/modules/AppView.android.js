import React, { Component, PropTypes } from 'react'

import {
  View,
  Navigator,
  DrawerLayoutAndroid,
  AsyncStorage,
} from 'react-native'

import Navigate from '../utils/Navigate'
import Toolbar from '../components/Toolbar'
import Drawer from '../components/Drawer/DrawerContainer'

const styles = {
  scene: {
    flex: 1,
    marginTop: 56,
  },
}

class App extends Component {
  static childContextTypes = {
    drawer: PropTypes.object,
    navigator: PropTypes.object,
  }

  static propTypes = {
    fetchTopics: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      drawer: null,
      navigator: null,
    }
  }

  getChildContext = () => {
    return {
      drawer: this.state.drawer,
      navigator: this.state.navigator,
    }
  }

  setDrawer = (drawer) => {
    this.setState({
      drawer,
    })
  }

  setNavigator = (navigator) => {
    const navigate = new Navigate(navigator)
    this.setState({
      navigator: navigate,
    })
    this.checkAuth(navigate)
  }

  checkAuth(navigate) {
    let { fetchTopics } = this.props
    AsyncStorage.getItem('auth_token').then((value) => {
      if (value) {
        fetchTopics()
      } else {
        if (navigate) {
          navigate.to('login')
        } else {
          console.log('no navigate what to dooooo?')
        }
      }
    })
  }

  render() {
    const { drawer, navigator } = this.state

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => {
          if (drawer && navigator) {
            return (
              <Drawer drawerWrapper={drawer} navigate={navigator} />
            )
          }
          return null
        }}
        ref={(drawerRef) => {
          if (drawerRef && !drawer) {
            this.setDrawer(drawerRef)
          }
        }}
      >
      {drawer &&
        <Navigator
          initialRoute={Navigate.getInitialRoute()}
          navigationBar={<Toolbar navigator={this.state.navigator} onIconPress={drawer.openDrawer} theme="googleBlue" />}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromBottomAndroid // FIXME: This clearly does nothing...
          }}
          ref={(navigatorRef) => {
            if (!navigator && navigatorRef) {
              return this.setNavigator(navigatorRef)
            }
            return false
          }}
          renderScene={(route) => {
            let returnedView
            if (navigator && route.component) {
              returnedView = (
                <View
                  style={[styles.scene, (route.hideHeader ? { marginTop: 0 } : {})]}
                  showsVerticalScrollIndicator={false}
                >
                  <route.component navigate={this.state.navigator} title={route.title} path={route.path} {...route.props} />
                </View>
              )
            } else {
              returnedView = <View />
            }
            return returnedView
          }}
        />
      }
      </DrawerLayoutAndroid>
    )
  }
}

export default App
