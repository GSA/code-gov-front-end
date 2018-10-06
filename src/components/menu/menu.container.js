import { connect } from 'react-redux';
import { getConfigValue } from '../../utils'
import get from 'lodash.get'
import MenuComponent from './menu.component';

const mapStateToProps = ({ router, siteConfig }) => {
  const onHomePage = get(router, 'location.pathname') === '/'
  return {
    color: onHomePage ? 'dark' : 'white',
    logoDark: getConfigValue(siteConfig, 'content.header.logos.dark'),
    logoLight: getConfigValue(siteConfig, 'content.header.logos.light'),
    menu: getConfigValue(siteConfig, 'content.header.menu'),
    siteTitle: getConfigValue(siteConfig, 'title'),
    transparent: onHomePage
  }
}

export default connect(mapStateToProps)(MenuComponent)
