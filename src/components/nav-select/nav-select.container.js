import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import NavSelectComponent from './nav-select.component'

const mapDispatchToProps = dispatch => ({
  handleChange: route => {
    console.log('running nav select container handleChange', route)
    dispatch(push(route))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(NavSelectComponent)
