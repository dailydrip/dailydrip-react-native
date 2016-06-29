import React, { Component, } from 'react'
import { View, Text, StyleSheet, AsyncStorage, } from 'react-native'
import { Actions } from 'react-native-router-flux';


class MainScreen extends Component {

  static propTypes = {}

  static defaultProps = {}

  componentDidMount(){
    AsyncStorage.getItem("auth_token")
    .then( (value) =>
          {
            if(!value){
              Actions.loginScreen({ type: 'reset' });
            }
          }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to DailyDrip Main Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default MainScreen