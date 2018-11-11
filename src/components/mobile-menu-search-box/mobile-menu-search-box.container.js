import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import MobileMenuSearchBoxComponent from './mobile-menu-search-box.component'
import hideMobileMenu from 'actions/hide-mobile-menu'
import collapseAllMobileMenuOptions from 'actions/collapse-all-mobile-menu-options'
import updateSearchParams from 'actions/update-search-params'

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: query => {
      dispatch(updateSearchParams( { query }))
      if (!window.location.pathname.includes('/search')) {
        dispatch(push('/search'))
      }
      dispatch(collapseAllMobileMenuOptions())
      dispatch(hideMobileMenu())
    }
  }
}

export default connect(null, mapDispatchToProps)(MobileMenuSearchBoxComponent)
