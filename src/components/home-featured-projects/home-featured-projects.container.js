import { connect } from 'react-redux';
import get from 'lodash.get'
import HomeFeaturedProjects from './home-featured-projects.component'

const mapStateToProps = ({ siteConfig }) => {
  let featuredProjects;
  if (siteConfig) {
    try {
      featuredProjects = siteConfig.content.home.featured.map((project, index) => {
        project.index = index
        return project
      })
    }
    catch (error) {
      console.warn("Failed to get featured projects from code-gov-config.json")
      console.error(error)
      featuredProjects = []
    }
  }
  else {
    featuredProjects = []
  }


  return { featuredProjects }
}

export default connect(mapStateToProps)(HomeFeaturedProjects)
