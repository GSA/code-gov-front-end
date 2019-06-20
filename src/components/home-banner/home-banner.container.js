import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { getConfigValue, normalize, now } from 'utils/other'
import HomeBannerComponent from './home-banner.component'

export const mapStateToProps = () => ({
  motto: getConfigValue('content.home.banner.motto'),
  subtitle: getConfigValue('content.home.banner.subtitle')
})

export default connect(mapStateToProps)(HomeBannerComponent)
