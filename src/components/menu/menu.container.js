import { connect } from 'react-redux';
import get from 'lodash.get'
import { getConfigValue } from 'utils/other'
import MenuComponent from './menu.component'
import toggleSearchDropdown from 'actions/toggle-search-dropdown'

const mapStateToProps = ({ searchDropdown }) => {
  // not using router from redux store because it's not reliable here
  const onHomePage = window.location.pathname === '/'
  return {
    color: onHomePage ? 'dark' : 'white',
    logoDark: getConfigValue('content.header.logos.dark'),
    logoLight: getConfigValue('content.header.logos.light'),
    menu: getConfigValue('content.header.menu'),
    searchDropdown,
    siteTitle: getConfigValue('title'),
    transparent: onHomePage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSearchDropdown: () => dispatch(toggleSearchDropdown())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent)
