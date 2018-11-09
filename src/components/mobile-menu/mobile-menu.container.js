import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import MobileMenuComponent from './mobile-menu.component'

const mapStateToProps = () => (
  {
    menu: getConfigValue('content.header.mobile_menu')
  }
)

export default connect(mapStateToProps)(MobileMenuComponent)
