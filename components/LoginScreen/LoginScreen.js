import React, { Component, } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, AsyncStorage, } from 'react-native'
import { Actions } from 'react-native-router-flux';

class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      login: '',
      password: '',
    }
  }

  static propTypes = {}

  static defaultProps = {}

  handleSubmit(){
    AsyncStorage.setItem("auth_token", "TOKEN").done();
    Actions.mainScreen({ type: 'reset'});
  }

   handleChangeLogin(event){
    this.setState({
      login: event.nativeEvent.text
    })
  }

   handleChangePassword(event){
    this.setState({
      password: event.nativeEvent.text
    })
  }

  render() {
    return (<View style={styles.container}>
        <TextInput
          ref="login"
          style={styles.loginInput}
          onChange={this.handleChangeLogin.bind(this)} 
          value={this.state.login} />

          <TextInput
            ref="password"
            style={styles.loginInput}
            secureTextEntry={true}
            onChange={this.handleChangePassword.bind(this)}
            value={this.state.password} />

          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.buttonText}> LOGIN </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
    loginInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});

export default LoginScreen