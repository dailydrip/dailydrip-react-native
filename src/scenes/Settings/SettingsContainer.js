import Settings from './index'
import { connect } from 'react-redux'
import API from '../../api'
import { Actions } from '../../actions'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInformation: () => {
      dispatch(Actions.fetchUserInformation())
    },
    updateUserInformation: () => {
      dispatch(Actions.updateUserInformation())
    }
  }
}

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings)
export default ConnectedSettings
