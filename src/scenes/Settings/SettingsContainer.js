import Settings from './index'
import { connect } from 'react-redux'
import API from '../../api'
import { Actions } from '../../actions'

const mapStateToProps = (state) => {
  const user = state.get('user')
  return {
    name: user.get('name'),
    email: user.get('email')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInformation: () => {
      dispatch(Actions.fetchUserInformation())
    },
    updateUserInformation: () => {
      dispatch(Actions.updateUserInformation())
    },
    setUserName: (name) => {
      dispatch(Actions.setUserName(name))
    },
    setUserEmail: (email) => {
      dispatch(Actions.setUserEmail(email))
    },
  }
}

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings)
export default ConnectedSettings
