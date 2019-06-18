import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import HomeAboutComponent from './home-about.component'

export const mapStateToProps = () => ({
  mission: getConfigValue('content.home.mission'),
  aboutItems: getConfigValue('content.home.about')
})

export default connect(mapStateToProps)(HomeAboutComponent)
