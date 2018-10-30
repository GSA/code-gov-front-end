import { connect } from 'react-redux';
import get from 'lodash.get'
import { getConfigValue } from 'utils/other'
import Footer from './footer.component'

const mapStateToProps = ({ router, siteConfig }) => {
  const onHomePage = get(router, 'location.pathname') === '/'
  return {
    color: onHomePage ? 'dark' : 'white',
    links: getConfigValue(siteConfig, 'content.footer.links'),
    logos: getConfigValue(siteConfig, 'content.footer.logos')
  }
}

export default connect(mapStateToProps)(Footer)
