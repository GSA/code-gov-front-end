import { connect } from 'react-redux';
import { getConfigValue } from '../../utils'
import HomeAboutComponent from './home-about.component'

const mapStateToProps = ({ siteConfig }) => {
  return {
    mission: getConfigValue(siteConfig, 'content.home.mission'),
    aboutItems: getConfigValue(siteConfig, 'content.home.about')
  }
}

export default connect(mapStateToProps)(HomeAboutComponent)
