import { connect } from 'react-redux';
import get from 'lodash.get'
import { getConfigValue } from 'utils/other'
import MenuComponent from './menu.component';

const mapStateToProps = ({ router }) => {
  const onHomePage = get(router, 'location.pathname') === '/'
  return {
    color: onHomePage ? 'dark' : 'white',
    logoDark: getConfigValue('content.header.logos.dark'),
    logoLight: getConfigValue('content.header.logos.light'),
    menu: getConfigValue('content.header.menu'),
    siteTitle: getConfigValue('title'),
    transparent: onHomePage
  }
}

export default connect(mapStateToProps)(MenuComponent)
