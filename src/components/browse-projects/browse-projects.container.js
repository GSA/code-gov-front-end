import { connect } from 'react-redux';
import { getConfigValue } from 'utils'
import saveAgencies from 'actions/save-agencies'
import BrowseProjectsComponent from './browse-projects.component'

const mapStateToProps = ({ agencies, siteConfig }) => {
  return {
    agencies,
    backgroundImage: getConfigValue(siteConfig, 'images.background'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveAgencies: () => dispatch(saveAgencies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseProjectsComponent)
