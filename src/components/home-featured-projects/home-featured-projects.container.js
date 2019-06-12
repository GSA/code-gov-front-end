import { connect } from 'react-redux'
import { getConfigValue } from 'utils/other'
import HomeFeaturedProjects from './home-featured-projects.component'

export const mapStateToProps = () => ({
  featuredProjects: getConfigValue('content.home.featured')
})

export default connect(mapStateToProps)(HomeFeaturedProjects)
