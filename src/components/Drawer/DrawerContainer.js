import { connect } from 'react-redux'
import Actions from '../../actions'
import Drawer from '../Drawer'

const mapStateToProps = (state) => {
  return {
    topics: state.get('topics'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectTopic: (topic) => {
      dispatch(Actions.selectTopic(topic.id))
    },
    logOut: () => {

    },
  }
}

const ConnectedDrawer = connect(mapStateToProps, mapDispatchToProps)(Drawer)

export default ConnectedDrawer
