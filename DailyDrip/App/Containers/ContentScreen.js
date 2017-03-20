import React from 'react'
import { ScrollView, Text, Image, View, ListView, Button } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Card, Text as TextElements } from 'react-native-elements'
import { Images } from '../Themes'

// Styles
import styles from './Styles/ContentScreenStyles'

export default class ContentScreen extends React.Component {

  render () {
    return (
      <ScrollView style={styles.container}>
        <TextElements h4>Content</TextElements>
      </ScrollView>
    )
  }
}
