import { connect } from 'react-redux';
import OfficialBannerComponent from './official-banner.component'
import { getConfigValue } from 'utils/other'

const mapStateToProps = () => {
  return {
    bannerOptions: getConfigValue('content.header.official_banner')
  }
}

export default connect(mapStateToProps)(OfficialBannerComponent)
