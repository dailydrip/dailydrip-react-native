import React, { Component, PropTypes } from 'react'
import OurAppIntro from '../../utils/AppIntro'
import { havelockBlue, white, textGrey, ecstasy } from '../../utils/colors'

const customStyles = {
  title: {
    color: havelockBlue,
    fontSize: 26,
    fontFamily: 'Montserrat-Regular',
  },
  description: {
    color: textGrey,
    textAlign: 'center',
  },
}

class Welcome extends Component {
  static contextTypes = {
    navigator: PropTypes.object,
  }

  onSkipBtnHandle = () => {
    this.context.navigator.to('topics')
  }
  doneBtnHandle = () => {
    this.context.navigator.to('topics')
  }

  render() {
    const pageArray = [
      {
        title: 'Why is DailyDrip better?',
        description: 'People who learn via Distributed Practice retain more in the same time than those who binge learn.  We make daily practice easy.',
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
        // img: require('../assets/some_image.png'),
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
        // img: require('../assets/some_image.png'),
        img: 'https://dc045baae05f09959af2a7a07d2f398fbe88d2d1.googledrive.com/host/0B-XkApzKpJ7QZVNoY3RrSS1jaHM',
        imgStyle: {
          height: 93 * 2.5,
          width: 103 * 2.5,
        },
        backgroundColor: white,
        fontColor: havelockBlue,
        level: 10,
      },
    ]
    return (
      <OurAppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        showSkipButton
        showDoneButton
        showDots
        pageArray={pageArray}
        customStyles={customStyles}
        dotColor={havelockBlue}
        activeDotColor={ecstasy}
      />
    )
  }
}

export default Welcome
