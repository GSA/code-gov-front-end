import { connect } from 'react-redux'
import loadProject from 'actions/load-project'
import ProjectPageComponent from './project-page.component'

export const mapStateToProps = ({ project }) => ({ repo: project })

export const mapDispatchToProps = dispatch => ({
  updateProject: repoID => {
    dispatch(loadProject(repoID))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPageComponent)
