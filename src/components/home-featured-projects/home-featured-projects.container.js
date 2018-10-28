import { connect } from 'react-redux';
import HomeFeaturedProjects from './home-featured-projects.component'
import { getConfigValue } from 'utils/other'

const mapStateToProps = ({ siteConfig }) => {
  return {
    featuredProjects: getConfigValue(siteConfig, 'content.home.featured')
  }
}

export default connect(mapStateToProps)(HomeFeaturedProjects)
