import React, { PropTypes, Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'

import {
  Card
} from 'react-native-material-design'

class Topic extends Component {
  static propTypes = {
    topic: PropTypes.object
  }
  render() {
    return (
      <ScrollView styles={styles.scrollView}>
        <View style={styles.container}>
          <Card>
            <Card.Body>
              <Text>Some episode</Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris sagittis pellentesque lacus eleifend lacinia...
              </Text>
            </Card.Body>
          </Card>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 56 : 0,
  }
})

export default Topic
