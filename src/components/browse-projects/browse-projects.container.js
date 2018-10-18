import { connect } from 'react-redux';
import saveFilterOptions from 'actions/save-filter-options'
import BrowseProjectsComponent from './browse-projects.component'

const mapStateToProps = ({ filters }) => {
  return {
    filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFilterData: () => dispatch(saveFilterOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseProjectsComponent)
