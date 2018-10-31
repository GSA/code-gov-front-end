import { connect } from 'react-redux'
import SiteBannerComponent from './site-banner.component'
import { getConfigValue } from 'utils/other'

const mapStateToProps = () => {
  return {
    backgroundImage: getConfigValue('images.background')
  }
}

export default connect(mapStateToProps)(SiteBannerComponent)
