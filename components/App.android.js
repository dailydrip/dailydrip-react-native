import React, { Component } from 'react'

import {
  AppRegistry,
  Text,
  View,
  Navigator,
  DrawerLayoutAndroid
} from 'react-native'

import { Ripple, Button, Card } from 'react-native-material-design'
import Navigate from '../utils/Navigate'
import Toolbar from './Toolbar'

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
		this.setState({
			navigator: new Navigate(navigator)
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
              <Text>Foo</Text>
            )
          }
          return null;
        }}
        ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
      >
        {drawer &&
          <Navigator
            initialRoute={Navigate.getInitialRoute()}
            navigationBar={<Toolbar onIconPress={drawer.openDrawer} theme="googleBlue" />}
            configureScene={() => {
              return Navigator.SceneConfigs.FadeAndroid;
            }}
            ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
            renderScene={(route) => {
              if (this.state.navigator && route.component) {
                return (
                  <View
                  style={styles.scene}
                  showsVerticalScrollIndicator={false}>
                  <route.component title={route.title} path={route.path} {...route.props} />
                  </View>
                );
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

export default App
