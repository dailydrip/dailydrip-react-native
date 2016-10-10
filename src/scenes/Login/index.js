import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Image,
} from 'react-native'
import API from '../../api'
import { ecstasy, textGrey, labelTextColor } from '../../utils/colors'

const logo = require('../../../assets/images/logo.png')
const backgroundIcons = require('../../../assets/images/background-icons.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    top: 0,
    left: 0,
    alignItems: 'center',
  },
  loginInput: {
    height: 50,
    width: 300,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    color: textGrey,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  logo: {
    marginTop: 40,
    marginBottom: 40,
    width: 173,
    height: 148,
    resizeMode: 'stretch',
  },
  signIn: {
    color: ecstasy,
    fontSize: 18,
    marginRight: 20,
  },
  signUp: {
    color: labelTextColor,
    fontSize: 18,
  },
  buttons: {
    marginTop: 30,
    left: 140,
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  forgotDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30,
  },
  forgotDetails: {
    color: labelTextColor,
    fontSize: 18,
  },
  helpSigningIn: {
    color: labelTextColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
})

class Login extends Component {
  static propTypes = {
    navigate: PropTypes.object,
    fetchTopics: PropTypes.func,
  }
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
    this.handleChangeLogin = this.handleChangeLogin.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const { navigate } = this.props
    API.login(this.state.login, this.state.password).then((data) => {
      AsyncStorage.setItem('auth_token', data.data.token).done()
      this.props.fetchTopics()
      navigate.to('welcome')
    }).catch((err) => {
      console.error(err)
    })
  }

  handleChangeLogin(event) {
    this.setState({
      login: event.nativeEvent.text,
    })
  }

  handleChangePassword(event) {
    this.setState({
      password: event.nativeEvent.text,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={backgroundIcons} style={styles.backgroundImage}>
          <Image style={styles.logo} source={logo} />
          <View style={styles.form}>
            <TextInput
              ref="login"
              autoFocus
              placeholder="Email"
              autoCapitalize="none"
              style={styles.loginInput}
              onChange={this.handleChangeLogin}
              onSubmitEditing={() => this.refs.password.focus()}
              blurOnSubmit={false}
              keyboardType="email-address"
              returnKeyType="next"
              value={this.state.login}
            />

            <TextInput
              ref="password"
              placeholder="Password"
              style={styles.loginInput}
              secureTextEntry
              onChange={this.handleChangePassword}
              onSubmitEditing={this.handleSubmit}
              blurOnSubmit={false}
              value={this.state.password}
              returnKeyType="go"
            />
            <View style={styles.forgotDetailsContainer}>
              <Text style={styles.forgotDetails}>
                Forget your sign in details?
              </Text>
              <Text style={styles.helpSigningIn}>
                Get help signing in.
              </Text>
            </View>

            <View style={styles.buttons}>
              <Text style={styles.signIn} onPress={this.handleSubmit}>SIGN IN</Text>
              <Text style={styles.signUp} onPress={() => this.props.navigate.to('getStarted')}>SIGN UP</Text>
            </View>
          </View>
        </Image>
      </View>
    )
  }
}

export default Login
