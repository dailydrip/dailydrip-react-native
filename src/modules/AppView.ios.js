import React, { Component, PropTypes } from 'react'

import {
  View,
  Navigator,
  AsyncStorage,
  Text,
  TouchableHighlight
} from 'react-native'

import DrawerLayout from 'react-native-drawer'
import Drawer from '../components/Drawer/DrawerContainer'
import Navigate from '../utils/Navigate'
import Toolbar from '../components/Toolbar'


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
      drawerOpen: false,
      drawerDisabled: false,
    }
    this.openDrawer = this.openDrawer.bind(this)
  }

  closeDrawer() {
    this._drawer.close()
  }

  openDrawer() {
    this._drawer.open()
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
    AsyncStorage.getItem('auth_token').then((value) => {
      if (value) {
        this.props.fetchTopics()
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
    let drawerView = null

    if (drawer && navigator) {
      drawerView = <Drawer drawerWrapper={drawer} navigate={navigator} />
    } else {
      drawerView = <Text>Loading</Text>
    }

    return (
      <DrawerLayout
        ref={(drawerRef) => {
          if (drawerRef && !drawer) {
            this.setDrawer(drawerRef)
          }
        }}
        type="overlay"
        tapToClose={true}
        content={drawerView}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        disabled={this.state.drawerDisabled}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        openDrawerOffset={100}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        <TouchableHighlight
          onPress={this.openDrawer}
        >
          <Text style={{marginTop: 30}}>
            Foo
          </Text>
        </TouchableHighlight>
        <Navigator
          initialRoute={Navigate.getInitialRoute()}
          navigationBar={<Text>toolbar</Text>}
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
      </DrawerLayout>
    )
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

export default App
