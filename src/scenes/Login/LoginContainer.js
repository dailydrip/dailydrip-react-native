import Login from './index'
import { connect } from 'react-redux'
import API from '../../api'
import { Actions } from '../../actions'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopics: () => {
      API.getTopics().then((response) => {
        dispatch(Actions.setTopics(response.data.topics))
      }).catch((err) => console.log(err))
    },
  }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export default ConnectedLogin
