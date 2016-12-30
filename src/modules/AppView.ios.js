import React, { Component, PropTypes } from 'react'

import {
  View,
  Navigator,
  AsyncStorage,
  Text
} from 'react-native'

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
      navigator: null,
    }
  }

  getChildContext = () => {
    return {
      navigator: this.state.navigator,
    }
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

    return (
      <Text>Foo</Text>
    )
  }
}

export default App
