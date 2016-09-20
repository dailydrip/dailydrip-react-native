import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, AsyncStorage } from 'react-native'
import { Ripple, Button } from 'react-native-material-design'
import API from '../api/DailyDripApi'
import Actions from '../actions'
import { connect } from 'react-redux'

class Login extends Component {
  static propTypes = {
    navigate: PropTypes.object
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
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.nativeEvent.text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="login"
          placeholder="email"
          autoCapitalize="none"
          style={styles.loginInput}
          onChange={this.handleChangeLogin}
          keyboardType="email-address"
          value={this.state.login}
        />

        <TextInput
          ref="password"
          placeholder="password"
          style={styles.loginInput}
          secureTextEntry
          onChange={this.handleChangePassword}
          value={this.state.password}
        />

        <Button
          text="LOGIN"
          raised
          onPress={this.handleSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
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
})

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopics: () => {
      API.getTopics().then((response) => {
        dispatch(Actions.setTopics(response.data.topics))
      })
    }
  }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

//export default Login
export default ConnectedLogin
