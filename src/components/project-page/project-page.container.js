import { connect } from 'react-redux'
import loadProject from 'actions/load-project'
import ProjectPageComponent from './project-page.component'

const mapStateToProps = ({ project }) => ({ repo: project })

const mapDispatchToProps = dispatch => ({
  updateProject: repoID => {
    dispatch(loadProject(repoID))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPageComponent)
