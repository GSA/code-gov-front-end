import { connect } from 'react-redux';
import { getConfigValue } from 'utils/other'
import HomeFeaturedProjects from './home-press.component'

const mapStateToProps = () => {
  return {
    backgroundImage: getConfigValue('images.background'),
    quote: getConfigValue('content.home.press.quote') || '',
    attributionImage: getConfigValue('content.home.press.attribution.image') || '',
    attributionUrl: getConfigValue('content.home.press.attribution.url') || '',
    links: getConfigValue('content.home.press.links')
  }
}

export default connect(mapStateToProps)(HomeFeaturedProjects)
