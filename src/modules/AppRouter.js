import React, { PropTypes } from 'react'
import {
  NavigationExperimental,
} from 'react-native'

const {
  PropTypes: NavigationPropTypes,
} = NavigationExperimental

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = (props) => {
  const key = props.scene.route.key

  if (key === 'Counter') {
    return <CounterViewContainer />
  }

  if (key.indexOf('Color') === 0) {
    const index = props.scenes.indexOf(props.scene)
    return (
      <ColorViewContainer
        index={index}
      />
    )
  }

  throw new Error(`Unknown navigation key: ${key}`)
}

AppRouter.propTypes = {
  scene: NavigationPropTypes.navigationState.isRequired,
  header: PropTypes.element.isRequired,
}

export default AppRouter
