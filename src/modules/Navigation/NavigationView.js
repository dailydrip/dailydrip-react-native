import React, { PropTypes } from 'react'
import {
  NavigationExperimental,
  View,
  StyleSheet,
} from 'react-native'
const {
  CardStack: NavigationCardStack,
  PropTypes: NavigationPropTypes,
} = NavigationExperimental
import AppRouter from '../AppRouter'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})


const NavigationView = (props) => {
  const scenes = props.navigationState
  return (
    <View style={styles.container}>
      <NavigationCardStack
        key={'stack_giggity'}
        onNavigateBack={props.onNavigateBack}
        navigationState={scenes}
        renderScene={AppRouter}
        style={styles.viewContainer}
      />
    </View>
  )
}

NavigationView.propTypes = {
  onNavigateBack: PropTypes.func.isRequired,
  onNavigateCompleted: PropTypes.func.isRequired,
  navigationState: NavigationPropTypes.navigationState.isRequired,
  pushRoute: PropTypes.func.isRequired,
}

export default NavigationView
