import { connect } from 'react-redux'
import SiteBannerComponent from './site-banner.component'
import { getConfigValue } from 'utils/other'

const mapStateToProps = ({ siteConfig }) => {
  return {
    backgroundImage: getConfigValue(siteConfig, 'images.background')
  }
}

export default connect(mapStateToProps)(SiteBannerComponent)
