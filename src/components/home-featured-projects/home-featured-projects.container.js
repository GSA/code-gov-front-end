import { connect } from 'react-redux';
import HomeFeaturedProjects from './home-featured-projects.component'
import { getConfigValue } from 'utils/other'

export const mapStateToProps = () => {
  return {
    featuredProjects: getConfigValue('content.home.featured')
  }
}

export default connect(mapStateToProps)(HomeFeaturedProjects)
