import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import SiteBannerComponent from './site-banner.component'

export const mapStateToProps = () => ({
  backgroundImage: getConfigValue('images.background')
})

export default connect(mapStateToProps)(SiteBannerComponent)
