import React, { PropTypes } from 'react'
import { Toolbar as MaterialToolbar } from 'react-native-material-design'

const Toolbar = ({ onIconPress, theme }, { navigator }) => {
  return (
    <MaterialToolbar
      title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Welcome'}
      primary={theme}
      icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
      onIconPress={() => { if (navigator && navigator.isChild) { navigator.back() } else { onIconPress() } }}
    />
  )
}

Toolbar.propTypes = {
  onIconPress: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}
Toolbar.contextTypes = {
  navigator: PropTypes.object,
}

export default Toolbar
