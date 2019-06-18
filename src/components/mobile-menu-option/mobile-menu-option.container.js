import { connect } from 'react-redux'
import hideMobileMenu from 'actions/hide-mobile-menu'
import toggleMobileMenuOption from 'actions/toggle-mobile-menu-option'
import collapseAllMobileMenuOptions from 'actions/collapse-all-mobile-menu-options'
import MobileMenuOptionComponent from './mobile-menu-option.component'

export const mapStateToProps = ({ expandedMobileMenuOptions }) => ({
  expandedMobileMenuOptions
})

export const mapDispatchToProps = dispatch => ({
  hideMobileMenu: () => {
    /* eslint-disable */
    dispatch(collapseAllMobileMenuOptions()), dispatch(hideMobileMenu())
  },
  /* eslint-enable */
  toggleMobileMenuOption: name => dispatch(toggleMobileMenuOption(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenuOptionComponent)
