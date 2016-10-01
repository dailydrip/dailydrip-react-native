import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, AsyncStorage, Image } from 'react-native'
import { Ripple, Button } from 'react-native-material-design'
import API from '../api/DailyDripApi'
import Actions from '../actions'
import { connect } from 'react-redux'

const logo = require('../assets/images/logo.png')

class Login extends Component {
  static propTypes = {
    navigate: PropTypes.object,
  }
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { navigate } = this.props
    API.login(this.state.login, this.state.password).then((data) => {
      AsyncStorage.setItem('auth_token', data.data.token).done()
      this.props.fetchTopics()
      navigate.to('welcome')
    }).catch((err) => {
      console.error(err)
    });
  }

  handleChangeLogin(event) {
    this.setState({
      login: event.nativeEvent.text,
    })
  }

  handleChangePassword(event) {
    this.setState({
      password: event.nativeEvent.text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.form}>
          <TextInput
            ref='login'
            autoFocus
            placeholder='Email'
            autoCapitalize='none'
            style={styles.loginInput}
            onChange={this.handleChangeLogin}
            onSubmitEditing={() => this.refs['password'].focus() }
            blurOnSubmit={false}
            keyboardType='email-address'
            returnKeyType='next'
            value={this.state.login}
          />

          <TextInput
            ref='password'
            placeholder='Password'
            style={styles.loginInput}
            secureTextEntry
            onChange={this.handleChangePassword}
            onSubmitEditing={this.handleSubmit}
            blurOnSubmit={false}
            value={this.state.password}
            returnKeyType='go'
          />

          <Button
            text="SIGN IN"
            styles={ { text: { fontSize: 25 } } }
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loginInput: {
    height: 50,
    width: 300,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    color: 'black',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  logo: {
    marginTop: 40,
    marginBottom: 40,
    width: 173,
    height: 148,
    resizeMode: 'stretch'
  }
})

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopics: () => {
      API.getTopics().then((response) => {
        dispatch(Actions.setTopics(response.data.topics))
      }).catch((err) => console.log(err))
    }
  }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

//export default Login
export default ConnectedLogin
