import { connect } from 'react-redux';
import { getConfigValue } from 'utils/other'
import HomeAboutComponent from './home-about.component'

const mapStateToProps = () => {
  return {
    mission: getConfigValue('content.home.mission'),
    aboutItems: getConfigValue('content.home.about')
  }
}

export default connect(mapStateToProps)(HomeAboutComponent)
