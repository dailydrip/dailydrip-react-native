import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Image,
} from 'react-native'
import API from '../../api'
import { ecstasy, textGrey, labelTextColor } from '../../utils/colors'

const logo = require('../../../assets/images/logo.png')
const backgroundIcons = require('../../../assets/images/background-icons.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    top: 0,
    left: 0,
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    width: 300,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    color: textGrey,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  logo: {
    marginTop: 40,
    marginBottom: 40,
    width: 173,
    height: 148,
    resizeMode: 'stretch',
  },
  signIn: {
    color: ecstasy,
    fontSize: 18,
    marginRight: 20,
  },
  signUp: {
    color: labelTextColor,
    fontSize: 18,
  },
  buttons: {
    marginTop: 30,
    left: 140,
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  forgotDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30,
  },
  forgotDetails: {
    color: labelTextColor,
    fontSize: 18,
  },
  helpSigningIn: {
    color: labelTextColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
})

class Settings extends Component {
  static propTypes = {
    navigate: PropTypes.object,
    fetchUserInformation: PropTypes.func,
    updateUserInformation: PropTypes.func,
    setUserName: PropTypes.func,
    setUserEmail: PropTypes.func,
  }
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.updateUserInformation()
  }

  handleChangeName(event) {
    this.props.setUserName(event.nativeEvent.text)
  }

  handleChangeEmail(event) {
    this.props.setUserEmail(event.nativeEvent.text)
  }

  componentWillMount() {
    this.props.fetchUserInformation();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={backgroundIcons} style={styles.backgroundImage}>
          <View style={styles.form}>
          <TextInput
              ref="name"
              autoFocus
              placeholder="Name"
              autoCapitalize="none"
              style={styles.textInput}
              onChange={this.handleChangeName}
              onSubmitEditing={() => this.refs.name.focus()}
              blurOnSubmit={false}
              returnKeyType="next"
              value={this.props.name}
            />

            <TextInput
              ref="email"
              autoFocus
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChange={this.handleChangeEmail}
              onSubmitEditing={() => this.refs.email.focus()}
              blurOnSubmit={false}
              keyboardType="email-address"
              returnKeyType="next"
              value={this.props.email}
            />

            <View style={styles.buttons}>
              <Text style={styles.signIn} onPress={this.handleSubmit}>SAVE</Text>
            </View>
          </View>
          <Image style={styles.logo} source={logo} />
        </Image>
      </View>
    )
  }
}

export default Settings
