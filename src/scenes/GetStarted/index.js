import React, { PropTypes } from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native'
import { ecstasy, textGrey } from '../../utils/colors'

const logo = require('../../../assets/images/logo.png')
const backgroundIcons = require('../../../assets/images/background-icons.png')
const blueCheck = require('../../../assets/images/blue_check.png')

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    top: 0,
    left: 0,
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
    width: 173,
    height: 148,
    resizeMode: 'stretch',
  },
  headline: {
    color: 'black',
    fontSize: 22,
  },
  tips: {
    marginTop: 50,
  },
  getStarted: {
    fontSize: 18,
    color: ecstasy,
  },
}

const Tip = (props) => {
  const tipStyles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      width: 300,
      marginBottom: 20,
    },
    check: {
      marginRight: 20,
      marginTop: 6,
    },
    text: {
      fontSize: 16,
      color: textGrey,
      width: 260,
    },
  }
  return (
    <View style={tipStyles.container}>
      <Image source={blueCheck} style={tipStyles.check} />
      <Text style={tipStyles.text}>{props.children}</Text>
    </View>
  )
}

Tip.propTypes = {
  children: PropTypes.string,
}

const GetStarted = (props, context) => (
  <View style={styles.container}>
    <Image source={backgroundIcons} style={styles.backgroundImage}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.headline}>
         Welcome to our community!
      </Text>
      <Text style={styles.headline}>
        A couple tips to get you started.
      </Text>
      <View style={styles.tips}>
        <Tip>Subscribe to a plan so you can see all the drips for one topic.</Tip>
        <Tip>Enroll in your topic(s) of choice and start receiving Daily Drips!</Tip>
        <Tip>Configure your delivery settings and more under your Account.</Tip>
      </View>
      <Text style={styles.getStarted} onPress={() => context.navigator.to('topics')}>GET STARTED</Text>
    </Image>
  </View>
)

GetStarted.contextTypes = {
  navigator: PropTypes.object.isRequired,
}

export default GetStarted
