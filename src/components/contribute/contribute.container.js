import { connect } from 'react-redux';
import { getConfigValue } from '../../utils'
import ContributeComponent from './contribute.component'

const mapStateToProps = ({ siteConfig }) => {
  return {}
}

export default connect(mapStateToProps)(ContributeComponent)
