/* global PUBLIC_PATH */
import { connect } from 'react-redux'
import hideMobileMenu from 'actions/hide-mobile-menu'
import showMobileMenu from 'actions/show-mobile-menu'
import toggleMobileMenu from 'actions/toggle-mobile-menu'
import MobileMenuControlComponent from './mobile-menu-control.component'

export const mapStateToProps = ({ displayMobileMenu, router }) => {
  const onHomePage = router.location.pathname === PUBLIC_PATH
  const color = onHomePage ? 'white' : 'dark'
  return {
    color,
    displayMobileMenu
  }
}

export const mapDispatchToProps = dispatch => ({
  hideMobileMenu: () => dispatch(hideMobileMenu()),
  showMobileMenu: () => dispatch(showMobileMenu()),
  toggleMobileMenu: () => dispatch(toggleMobileMenu())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenuControlComponent)
