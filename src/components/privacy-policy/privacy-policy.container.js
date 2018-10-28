import { connect } from 'react-redux';
import { getConfigValue } from 'utils/other'
import PrivacyPolicyComponent from './privacy-policy.component'
import privacyPolicy from '../../../config/site/docs/privacy-policy.md'

const mapStateToProps = ({ siteConfig }) => {
  return {
    privacyPolicy
  }
}

export default connect(mapStateToProps)(PrivacyPolicyComponent)