import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import { Toolbar as MaterialToolbar } from 'react-native-material-design'

export default class Toolbar extends Component {
    static contextTypes = {
      navigator: PropTypes.object
    };

    static propTypes = {
      onIconPress: PropTypes.func.isRequired,
      theme: PropTypes.string.isRequired
    };

    render() {
        const { navigator } = this.context;
        const { onIconPress, theme } = this.props;

        return (
            <MaterialToolbar
                title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Welcome'}
                primary={theme}
                icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
                onIconPress={() => navigator && navigator.isChild ? navigator.back() : onIconPress()}
            />
        );
    }
}
