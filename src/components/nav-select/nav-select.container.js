import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import NavSelectComponent from './nav-select.component'

const mapStateToProps = ({ router }) => {
  return {
    pathname: router.location.pathname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: route => {
      console.log("running nav select container handleChange", route)
      dispatch(push(route))
    }
  }
}

export default connect(null, mapDispatchToProps)(NavSelectComponent)
