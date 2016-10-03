import React from 'react'
import AppIntro from 'react-native-app-intro'
import { View, Text, Animated, Image } from 'react-native'

class OurAppIntro extends AppIntro {
  // Overriding this sucker because we need to be able to specify the text color more nicely.
  renderBasicSlidePage = (index, {
    title,
    description,
    img,
    imgStyle,
    backgroundColor,
    fontColor,
    level,
  }) => {
    const AnimatedStyle1 = this.getTransform(index, 10, level)
    const AnimatedStyle2 = this.getTransform(index, 0, level)
    const AnimatedStyle3 = this.getTransform(index, 15, level)
    const pageView = (
      <View style={[this.styles.slide, { padding: 10, backgroundColor }]} key={index}>
        <Animated.View style={[this.styles.header, ...AnimatedStyle1.transform]}>
          <Image style={imgStyle} source={{ uri: img }} />
        </Animated.View>
        <View style={this.styles.info}>
          <Animated.View style={AnimatedStyle2.transform}>
            <Text style={[{ color: fontColor }, this.styles.title]}>{title}</Text>
          </Animated.View>
          <Animated.View style={AnimatedStyle3.transform}>
            <Text style={[{ color: fontColor }, this.styles.description]}>{description}</Text>
          </Animated.View>
        </View>
      </View>
    )
    return pageView
  }
}

export default OurAppIntro
