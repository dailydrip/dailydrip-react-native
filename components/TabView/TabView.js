import React, { Component, } from 'react'
import { PropTypes } from 'react';
import { StyleSheet, Text, View, AsyncStorage, } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

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

const topicsFromApi = ["Elixir", "Elm", "Elm Remote Meetup", "HTML+CSS", "Modern Development Practices", "Sidekiq"];

const TabView = (props, context) => {
  const drawer = context.drawer;
  const buttons = topicsFromApi;

  var logout = function(){
    AsyncStorage.clear();
  }

  let topics = buttons.map((v,i) => <Button key={i} onPress={() => { drawer.close(); Actions.topicScreen({ topic: v }); }}>{v}</Button>);

  return (
    <View style={[styles.container, props.sceneStyle]}>
      <Button onPress={() => { drawer.close(); Actions.mainScreen({type: 'reset'}); }}>Home</Button>
      <Button onPress={() => { drawer.close(); Actions.topicScreen({type: 'reset'}); }}>Topic</Button>
      { topics }
      <Button onPress={() => { drawer.close(); Actions.settingsScreen({type: 'reset'}); }}>Settings</Button>
      <Button onPress={() => { drawer.close(); logout(); Actions.loginScreen({type: 'reset'}); }}>Logout</Button>
      
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

module.exports = TabView;