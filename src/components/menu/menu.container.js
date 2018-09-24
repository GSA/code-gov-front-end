/*

  grab menu from config

  convert color === 'white' ? headerContent?.logos?.dark : headerContent?.logos?.light

  figure out for nav className="'main' + color + (!isAtTop ? 'not-at-top' : '') + (expanded ? 'expanded' : '')" style={'height': height + 'px'}

    color: 'white', // needs to be dynamic
    className: 'main white expanded'

*/

import { connect } from 'react-redux';
import { getConfigValue } from '../../utils'
import MenuComponent from './menu.component';

const mapStateToProps = ({ siteConfig }) => {
  return {
    color: "dark", // need to make dynamic between white and dark listening to route
    logoDark: getConfigValue(siteConfig, 'content.header.logos.dark'),
    logoLight: getConfigValue(siteConfig, 'content.header.logos.light'),
    menu: getConfigValue(siteConfig, 'content.header.menu'),
    siteTitle: getConfigValue(siteConfig, 'title')
  }
}

export default connect(mapStateToProps)(MenuComponent)
