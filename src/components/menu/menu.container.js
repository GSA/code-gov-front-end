/* global PUBLIC_PATH */

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getConfigValue, isHomepage } from 'utils/other'
import toggleSearchDropdown from 'actions/toggle-search-dropdown'
import MenuComponent from './menu.component'

export const mapStateToProps = ({ router, searchDropdown }) => ({
    color: 'white',
    logoDark: getConfigValue('content.header.logos.dark'),
    logoLight: getConfigValue('content.header.logos.light'),
    menu: getConfigValue('content.header.menu'),
    onHomePage: isHomepage,
    searchDropdown,
    siteTitle: getConfigValue('title')
})

export const mapDispatchToProps = dispatch => ({
  toggleSearchDropdown: () => dispatch(toggleSearchDropdown())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuComponent)
)
