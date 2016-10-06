import { PropTypes } from 'react'
import { requireNativeComponent, View } from 'react-native'

const iface = {
  name: 'ButtonAndroid',
  propTypes: {
    text: PropTypes.string,
    ...View.propTypes, // include the default view properties
  },
}

export default requireNativeComponent('RCTButtonView', iface)
