import { connect } from 'react-redux';
import { getConfigValue } from 'utils/other'
import Footer from './footer.component'

const mapStateToProps = ({ siteConfig }) => {
  return {
    links: getConfigValue(siteConfig, 'content.footer.links'),
    logos: getConfigValue(siteConfig, 'content.footer.logos')
  }
}

export default connect(mapStateToProps)(Footer)
