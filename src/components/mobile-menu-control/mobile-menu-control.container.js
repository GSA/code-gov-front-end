/* global PUBLIC_PATH */
import { connect } from 'react-redux'
import MobileMenuControlComponent from './mobile-menu-control.component'
import hideMobileMenu from 'actions/hide-mobile-menu'
import showMobileMenu from 'actions/show-mobile-menu'
import toggleMobileMenu from 'actions/toggle-mobile-menu'

const mapStateToProps = ({ displayMobileMenu, router }) => {
  const onHomePage = router.location.pathname === PUBLIC_PATH
  const color = onHomePage ? 'white' : 'dark'
  return {
    color,
    displayMobileMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideMobileMenu: () => dispatch(hideMobileMenu()),
    showMobileMenu: () => dispatch(showMobileMenu()),
    toggleMobileMenu: () => dispatch(toggleMobileMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenuControlComponent)
