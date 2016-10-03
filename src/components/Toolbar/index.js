import React, { PropTypes } from 'react'
import {
  View,
} from 'react-native'
import { Toolbar as MaterialToolbar } from 'react-native-material-design'

const Toolbar = ({ onIconPress, theme }, { navigator }) => {
  let toolbar

  if (navigator) {
    if (navigator.currentRoute) {
      if (navigator.currentRoute.hideToolbar) {
        toolbar = (<View />)
      } else {
        toolbar = (
          <MaterialToolbar
            title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Welcome'}
            primary={theme}
            icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
            onIconPress={() => { if (navigator && navigator.isChild) { navigator.back() } else { onIconPress() } }}
          />
        )
      }
    } else {
      toolbar = (<View />)
    }
  } else {
    toolbar = (<View />)
  }

  return toolbar
}

Toolbar.propTypes = {
  onIconPress: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}
Toolbar.contextTypes = {
  navigator: PropTypes.object,
}

export default Toolbar
