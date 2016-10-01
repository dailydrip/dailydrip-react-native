import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import AppIntro from 'react-native-app-intro'

const havelockBlue = '#4A90E2'
const white = '#ffffff'

class Welcome extends Component {
  onSkipBtnHandle = (index) => {
    Alert.alert('skip')
    console.log(index)
  }
  doneBtnHandle = () => {
    Alert.alert('Done')
  }
  nextBtnHandle = (index) => {
    Alert.alert('Next')
    console.log(index)
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total)
  }

  render() {
    const pageArray = [{
        title: 'Why is DailyDrip better?',
        description: 'People who learn via Distributed Practice retain more in the same time than those who bing learn.  We make daily practice easy.',
        img: 'https://dc045baae05f09959af2a7a07d2f398fbe88d2d1.googledrive.com/host/0B-XkApzKpJ7QZVNoY3RrSS1jaHM',
        imgStyle: {
          height: 80 * 2.5,
          width: 109 * 2.5,
        },
        backgroundColor: white,
        fontColor: havelockBlue,
        level: 10,
      },
      {
        title: 'How does it work?',
        description: 'Learn daily by just checking your email, or work through our exclusive content at your own pace.  We respect your time, and you\'ll learn in just five minutes a day.',
        //img: require('../assets/some_image.png'),
        img: 'https://dc045baae05f09959af2a7a07d2f398fbe88d2d1.googledrive.com/host/0B-XkApzKpJ7QZVNoY3RrSS1jaHM',
        imgStyle: {
          height: 93 * 2.5,
          width: 103 * 2.5,
        },
        backgroundColor: white,
        fontColor: havelockBlue,
        level: 10,
      },
      {
        title: 'Learn at your pace',
        description: 'Once you\'ve enrolled in a topic, you\'ll always be able to go back or skip ahead via our web and mobile applications.  You can also fully customize your drip delivery settings under your account tab.',
        //img: require('../assets/some_image.png'),
        img: 'https://dc045baae05f09959af2a7a07d2f398fbe88d2d1.googledrive.com/host/0B-XkApzKpJ7QZVNoY3RrSS1jaHM',
        imgStyle: {
          height: 93 * 2.5,
          width: 103 * 2.5,
        },
        backgroundColor: white,
        fontColor: havelockBlue,
        level: 10,
      }
    ]
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        showSkipButton={true}
        showDoneButton={true}
        pageArray={pageArray}
      />
    )
  }
}

export default Welcome
