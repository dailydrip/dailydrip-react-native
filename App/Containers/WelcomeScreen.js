// @flow

import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import API from '../Services/DailyDripApi'
import { Actions } from '../Redux/actions'
import Immutable from 'immutable'

// Styles
import styles from './Styles/WelcomeScreenStyle'

class PresentationScreen extends React.Component {

  componentWillMount() {
    this.props.fetchTopics()
  }

  render () {
    const { topics } = this.props;

    var topicsRendered = topics.map((topic, id)=> {
      let title = topic.get('title')
      let description = topic.get('description')
      let dripCount = topic.get('drip_count')

      return(<RoundedButton onPress={NavigationActions.componentExamples}>
            {title}
          </RoundedButton>
        )
    })

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Get your weekend back
            </Text>
          </View>

          {topicsRendered}

          <View style={styles.centered}>
            <Text style={styles.subtitle}>Here you can just spend 5min a day and learn things.</Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    topics: state.get('topics')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopics: () => { dispatch(Actions.fetchTopics()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
