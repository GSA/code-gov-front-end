import { connect } from 'react-redux'
import MobileMenuControlComponent from './mobile-menu-control.component'
import hideMobileMenu from 'actions/hide-mobile-menu'
import showMobileMenu from 'actions/show-mobile-menu'
import toggleMobileMenu from 'actions/toggle-mobile-menu'

const mapStateToProps = ({ displayMobileMenu, router }) => {
  // not using router from redux store because it's not reliable here
  const onHomePage = window.location.pathname === '/'
  console.warn("Control onHomePage:", onHomePage)
  return {
    color: onHomePage ? 'white' : 'dark',
    open: displayMobileMenu
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
