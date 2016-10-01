import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import AppIntro from 'react-native-app-intro'

class Welcome extends Component {
  render() {
    console.log("rendering from Welcome")
    return (
      <View>
        <Text>Zomg</Text>
      </View>
    )
  }
}

export default Welcome
