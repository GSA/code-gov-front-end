import { connect } from 'react-redux'
import PrivacyPolicyComponent from './privacy-policy.component'
import privacyPolicy from '../../../config/site/docs/privacy-policy.md'

export const mapStateToProps = () => ({
  privacyPolicy
})

export default connect(mapStateToProps)(PrivacyPolicyComponent)
