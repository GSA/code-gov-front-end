import { connect } from 'react-redux';
import get from 'lodash.get'
import HomeAboutComponent from './home-about.component'

const mapStateToProps = ({ siteConfig }) => {
  return {
    mission: get(siteConfig, 'content.home.mission'),
    aboutItems: get(siteConfig, 'content.home.about')
  }
}

export default connect(mapStateToProps)(HomeAboutComponent)
