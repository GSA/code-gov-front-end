import { connect } from 'react-redux';
import { getConfigValue } from 'utils'
import saveFilterData from 'actions/save-filter-data'
import BrowseProjectsComponent from './browse-projects.component'

const mapStateToProps = ({ agencies, filters, siteConfig }) => {
  return {
    backgroundImage: getConfigValue(siteConfig, 'images.background'),
    filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFilterData: () => dispatch(saveFilterData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseProjectsComponent)
