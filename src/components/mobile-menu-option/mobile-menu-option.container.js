import { connect } from 'react-redux'
import MobileMenuOptionComponent from './mobile-menu-option.component'
import hideMobileMenu from 'actions/hide-mobile-menu'
import toggleMobileMenuOption from 'actions/toggle-mobile-menu-option'
import collapseAllMobileMenuOptions from 'actions/collapse-all-mobile-menu-options'

const mapStateToProps = ({ expandedMobileMenuOptions }) => {
  return {
    expandedMobileMenuOptions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideMobileMenu: () => {
      dispatch(collapseAllMobileMenuOptions()),
      dispatch(hideMobileMenu())
    },
    toggleMobileMenuOption: name => dispatch(toggleMobileMenuOption(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenuOptionComponent)
