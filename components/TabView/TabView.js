import React, { Component, } from 'react'
import { PropTypes } from 'react';
import { StyleSheet, Text, View, AsyncStorage, } from 'react-native';
import Button from 'react-native-button';
import { Actions as RouterActions } from 'react-native-router-flux';
import { connect } from 'react-redux'

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer
  const buttons = props.topics || []

  let logout = function(){
    AsyncStorage.clear()
  }

  let topics = buttons.map((topic,i) => {
    let onButtonPress = () => {
      drawer.close()
      RouterActions.topicScreen({ topic })
    }
    return <Button key={i} onPress={onButtonPress}>{topic.title}</Button>
  })

  return (
    <View style={[styles.container, props.sceneStyle]}>
      <Button onPress={() => { drawer.close(); RouterActions.mainScreen({type: 'reset'}); }}>Home</Button>
      <Button onPress={() => { drawer.close(); RouterActions.topicScreen({type: 'reset'}); }}>Topic</Button>
      { topics }
      <Button onPress={() => { drawer.close(); RouterActions.settingsScreen({type: 'reset'}); }}>Settings</Button>
      <Button onPress={() => { drawer.close(); logout(); RouterActions.loginScreen({type: 'reset'}); }}>Logout</Button>

    </View>
  )
}

TabView.contextTypes = contextTypes
TabView.propTypes = propTypes

let mapStateToProps = function mapStateToProps(state){
  console.log(state)
  return {
    topics: state.topics
  }
}

let mapDispatchToProps = function mapDispatchToProps(dispatch){
  return {}
}

let ConnectedTabView = connect(mapStateToProps, mapDispatchToProps)(TabView)

export default ConnectedTabView
