import React, { Component } from 'react'
import Immutable from 'immutable'

import {
  AppRegistry,
  Text,
  View,
  Navigator,
  DrawerLayoutAndroid,
  AsyncStorage
} from 'react-native'

import { Ripple, Button, Card } from 'react-native-material-design'
import Navigate from '../utils/Navigate'
import Toolbar from './Toolbar'
import Drawer from './Drawer/Drawer'
import { connect } from 'react-redux'
import API from '../api/DailyDripApi'
import Actions from '../actions'

class App extends Component {
	static childContextTypes = {
		drawer: React.PropTypes.object,
		navigator: React.PropTypes.object
	}

	constructor(props) {
		super(props)
		this.state = {
			drawer: null,
			navigator: null
		}
	}

	getChildContext = () => {
		return {
			drawer: this.state.drawer,
			navigator: this.state.navigator
		}
	}

	setDrawer = (drawer) => {
		this.setState({
			drawer
		})
	}

	setNavigator = (navigator) => {
    let navigate = new Navigate(navigator)
		this.setState({
			navigator: navigate
		})
    this.checkAuth(navigate)
	}

  checkAuth(navigate) {
    AsyncStorage.getItem('auth_token').then((value) => {
      if (value) {
        console.log('we were logged in zomg')
        this.props.fetchTopics()
      } else {
        console.log('herp derp not logged in')
        if(navigate){
          console.log('trying to navigate')
          navigate.to('login')
          console.log('navigated...')
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
              <Drawer drawerWrapper={drawer} navigate={navigator}></Drawer>
            )
          }
          return null
        }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
      >
        {drawer &&
          <Navigator
            initialRoute={Navigate.getInitialRoute()}
            navigationBar={<Toolbar onIconPress={drawer.openDrawer} theme="googleBlue" />}
            configureScene={() => {
              return Navigator.SceneConfigs.FadeAndroid
            }}
            ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
            renderScene={(route) => {
              if (this.state.navigator && route.component) {
                return (
                  <View
                  style={styles.scene}
                  showsVerticalScrollIndicator={false}>
                    <route.component navigate={this.state.navigator} title={route.title} path={route.path} {...route.props} />
                  </View>
                )
              }
            }}
          />
        }
      </DrawerLayoutAndroid>
    )
  }
}

const styles = {
	scene: {
		flex: 1,
		marginTop: 56
	}
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopics: () => {
      API.getTopics().then((response) => {
        const topicsMap = response.data.topics.reduce((acc, topic) => {
          return acc.set(topic.id, Immutable.fromJS(topic))
        }, Immutable.Map())
        dispatch(Actions.setTopics(topicsMap))
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
//export default App
