import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput, AsyncStorage } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import API from '../../api/DailyDripApi';

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
});

class LoginScreen extends Component {

  static propTypes = {}

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
    API.login(this.state.login, this.state.password).then((data) => {
      AsyncStorage.setItem('auth_token', data.data.token).done();
      RouterActions.mainScreen({ type: 'reset' });
    }).catch((err) => {
      console.error(err);
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
          autoCapitalize="none"
          style={styles.loginInput}
          onChange={this.handleChangeLogin}
          keyboardType="email-address"
          value={this.state.login}
        />

        <TextInput
          ref="password"
          style={styles.loginInput}
          secureTextEntry
          onChange={this.handleChangePassword}
          value={this.state.password}
        />

        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableHighlight>
      </View>
    );
  }
}


export default LoginScreen;
