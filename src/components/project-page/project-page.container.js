import { connect } from 'react-redux'
import ProjectPageComponent from './project-page.component'
import loadProject from 'actions/load-project'

const mapStateToProps = ({ project }) => {
  return { repo: project }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProject: repoID => {
      dispatch(loadProject(repoID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPageComponent)
