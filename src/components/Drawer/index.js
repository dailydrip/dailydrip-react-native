import React, { Component } from 'react'
import { DefaultRenderer } from 'react-native-router-flux'
import NativeDrawer from 'react-native-drawer'
import TabView from '../TabView/TabView'
import variables from '../variables'

export class Drawer extends Component {
  static propTypes = {
    navigationState: React.PropTypes.object,
    onNavigate: React.PropTypes.func,
  }

  render() {
    const state = this.props.navigationState
    const children = state.children

    return (
      <NativeDrawer
        ref="navigation"
        open={state.open}
        type="displace"
        content={<TabView />}
        tapToClose
        openDrawerOffset={0.6}
        panCloseMask={0.2}
        negotiatePan
        styles={{
          main: {
            backgroundColor: variables.dodgerBlue,
            shadowColor: '#000000',
            shadowOpacity: 0.3,
            shadowRadius: 15,
          },
          drawer: {
            backgroundColor: variables.dodgerBlue,
            top: 0,
          },
        }}
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </NativeDrawer>
    )
  }
}

export default Drawer
