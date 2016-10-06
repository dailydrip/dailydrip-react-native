import React, { PropTypes } from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native'
import Swiper from 'react-native-swiper'
import { havelockBlue, white, textGrey } from '../../utils/colors'
import StripeAndroid from '../../modules/native/StripeAndroid'
import ButtonAndroid from '../../modules/native/ButtonAndroid'

const backgroundScreen1 = require('../../../assets/images/welcome/screen1.png')
const backgroundScreen2 = require('../../../assets/images/welcome/screen2.png')
const backgroundScreen3 = require('../../../assets/images/welcome/screen3.png')
const dotSize = 10

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: white,
  },
  title: {
    color: havelockBlue,
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    color: textGrey,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  image: {
    height: 350,
  },
  slideInterior: {
    padding: 40,
  },
  pagination_x: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  skip: {
    fontSize: 18,
    position: 'absolute',
    right: 25,
    bottom: 55,
    color: havelockBlue,
  },
}

const screen1 = {
  title: 'Why is DailyDrip better?',
  description: 'People who learn via Distributed Practice retain more in the same time than those who binge learn.  We make daily practice easy.',
  img: backgroundScreen1,
}

const screen2 = {
  title: 'How does it work?',
  description: 'Learn daily by just checking your email, or work through our exclusive content at your own pace.  We respect your time, and you\'ll learn in just five minutes a day.',
  img: backgroundScreen2,
}

const screen3 = {
  title: 'Learn at your pace',
  description: 'Once you\'ve enrolled in a topic, you\'ll always be able to go back or skip ahead via our web and mobile applications.  You can also fully customize your drip delivery settings under your account tab.',
  img: backgroundScreen3,
}

/**
 * Render pagination
 * @return {object} react-dom
 */
const renderPagination = (index, total, component) => {
  let dots = []
  const ActiveDot = component.props.activeDot || (
    <View
      style={{
        backgroundColor: '#007aff',
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  )
  const Dot = component.props.dot || (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,.2)',
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  )
  for (let i = 0; i < total; i++) {
    dots.push(i === index
      ? React.cloneElement(ActiveDot, { key: i })
      : React.cloneElement(Dot, { key: i })
    )
  }

  return (
    <View pointerEvents={'none'} style={[styles[`pagination_${component.state.dir}`], component.props.paginationStyle]}>
      {dots}
    </View>
  )
}

const Welcome = (_props, context) => (
  <View>
    <Swiper style={styles.wrapper} showsButtons renderPagination={renderPagination}>
      <View style={styles.slide}>
        <Image resizeMode="contain" style={styles.image} source={screen1.img} />
        <View style={styles.slideInterior}>
          <Text style={styles.title}>{screen1.title}</Text>
          <Text style={styles.text}>{screen1.description}</Text>
        </View>
      </View>
      <View style={styles.slide}>
        <Image resizeMode="contain" style={styles.image} source={screen2.img} />
        <View style={styles.slideInterior}>
          <Text style={styles.title}>{screen2.title}</Text>
          <Text style={styles.text}>{screen2.description}</Text>
        </View>
      </View>
      <View style={styles.slide}>
        <Image resizeMode="contain" style={styles.image} source={screen3.img} />
        <View style={styles.slideInterior}>
          <Text style={styles.title}>{screen3.title}</Text>
          <Text style={styles.text}>{screen3.description}</Text>
        </View>
      </View>
    </Swiper>
    <Text style={styles.skip} onPress={() => { StripeAndroid.show('foo', StripeAndroid.SHORT); context.navigator.to('topics') }}>SKIP</Text>
  </View>
)
//<ButtonAndroid text={'foo'} style={styles.skip} />
// If I place this where the 'text' is above, I can sort of see it as a single pixel in the view...very odd

Welcome.contextTypes = {
  navigator: PropTypes.object.isRequired,
}

export default Welcome
