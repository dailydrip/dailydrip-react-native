import React from 'react'
import { ScrollView, Dimensions, Text, Image, View, ListView, Button, WebView } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Card, Text as TextElements } from 'react-native-elements'
import { Images } from '../Themes'

// Styles
import styles from './Styles/ContentScreenStyles'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height - 100

export default class ContentScreen extends React.Component {

  render () {
    const {title, teaser, description_html } = this.props.drip
    // const { description, title } = this.props
    return (
      <ScrollView style={styles.container}>
        <Text>{title}</Text>
        <Text>{teaser}</Text>
        <WebView source={{html: description_html}} style={{width: width, height: height}}/>
      </ScrollView>
    )
  }
}
