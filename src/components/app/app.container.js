import AppComponent from './app.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import newSearch from 'actions/new-search'
import saveSiteConfig from 'actions/save-site-config'
import loadProject from 'actions/load-project'
import updateBrowseFilters from 'actions/update-browse-filters'
import updateSearchFilters from 'actions/update-search-filters'

const mapDispatchToProps = dispatch => {
  return {
    loadInitialSearch: (query) => {
      dispatch(newSearch(query))
    },
    loadProject: repoID => dispatch(loadProject(repoID)),
    saveSiteConfig: (siteConfig) => dispatch(saveSiteConfig(siteConfig)),
    updateBrowseFilters: (category, values) => dispatch(updateBrowseFilters(category, values)),
    updateSearchFilters: (category, values) => dispatch(updateSearchFilters(category, values))
  }
}

const AppContainer = connect(null, mapDispatchToProps)(AppComponent);

export default withRouter(AppContainer);
