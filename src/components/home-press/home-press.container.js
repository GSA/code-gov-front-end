import { connect } from 'react-redux';
import { getConfigValue } from '../../utils'
import HomeFeaturedProjects from './home-press.component'

const mapStateToProps = ({ siteConfig }) => {
  return {
    backgroundImage: getConfigValue(siteConfig, 'images.background'),
    quote: getConfigValue(siteConfig, 'content.home.press.quote') || '',
    attribution: getConfigValue(siteConfig, 'content.home.press.attribution') || '',
    links: getConfigValue(siteConfig, 'content.home.press.links')
  }
}

export default connect(mapStateToProps)(HomeFeaturedProjects)
