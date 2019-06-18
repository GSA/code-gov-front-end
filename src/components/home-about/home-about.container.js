import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import HomeAboutComponent from './home-about.component'

export const mapStateToProps = () => ({
  aboutus: getConfigValue('content.home.aboutus'),
  mission: getConfigValue('content.home.mission'),
  vision: getConfigValue('content.home.vision')
})

export default connect(mapStateToProps)(HomeAboutComponent)
