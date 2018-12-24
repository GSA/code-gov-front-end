/* global PUBLIC_PATH */

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { getConfigValue } from 'utils/other'
import MenuComponent from './menu.component'
import toggleSearchDropdown from 'actions/toggle-search-dropdown'

const mapStateToProps = ({ router, searchDropdown }) => {
  const onHomePage = router.location.pathname === PUBLIC_PATH
  return {
    color: onHomePage ? 'dark' : 'white',
    logoDark: getConfigValue('content.header.logos.dark'),
    logoLight: getConfigValue('content.header.logos.light'),
    menu: getConfigValue('content.header.menu'),
    onHomePage,
    searchDropdown,
    siteTitle: getConfigValue('title'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSearchDropdown: () => dispatch(toggleSearchDropdown())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuComponent))
