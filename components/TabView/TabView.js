import React, { Component, } from 'react'
import { PropTypes } from 'react';
import { StyleSheet, Text, View, AsyncStorage, } from 'react-native';
import Button from 'react-native-button';
import { Actions as RouterActions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import variables from '../variables'

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
    height: 400,
    backgroundColor: variables.dodgerBlue,
  },
  navLink: {
    color: "#ffffff",
    textAlign: "left",
    padding: 10,
  }
});

const TabView = (props, context) => {
  const drawer = context.drawer
  const topics = props.topics || []

  let logout = function(){
    AsyncStorage.clear() // LOL A BIT TOO ZEALOUS
  }

  let topicButtons = topics.map((topic,i) => {
    let onButtonPress = () => {
      drawer.close()
      RouterActions.topicScreen({ topic })
    }
    return <Button style={styles.navLink} key={i} onPress={onButtonPress}>{topic.title}</Button>
  })

  return (
    <View style={[styles.container, props.sceneStyle]}>
      <Button style={styles.navLink} onPress={() => { drawer.close(); RouterActions.mainScreen({type: 'reset'}); }}>Home</Button>
      { topicButtons }
      <Button style={styles.navLink} onPress={() => { drawer.close(); RouterActions.settingsScreen({type: 'reset'}); }}>Settings</Button>
      <Button style={styles.navLink} onPress={() => { drawer.close(); logout(); RouterActions.loginScreen({type: 'reset'}); }}>Logout</Button>
    </View>
  )
}

TabView.contextTypes = contextTypes
TabView.propTypes = propTypes

let mapStateToProps = function mapStateToProps(state){
  return {
    topics: state.topics
  }
}

let mapDispatchToProps = function mapDispatchToProps(dispatch){
  return {}
}

let ConnectedTabView = connect(mapStateToProps, mapDispatchToProps)(TabView)

export default ConnectedTabView
