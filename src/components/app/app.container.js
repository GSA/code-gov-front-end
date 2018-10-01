import AppComponent from './app.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import newSearch from 'actions/new-search'
import saveSiteConfig from 'actions/save-site-config'
import saveInitialSelections from 'actions/save-initial-selections'
import updateSearchFilters from 'actions/update-search-filters'

const mapDispatchToProps = dispatch => {
  return {
    loadInitialSearch: (query) => {
      dispatch(newSearch(query))
    },
    saveSiteConfig: (siteConfig) => dispatch(saveSiteConfig(siteConfig)),
    saveInitialSelections: (saveInitialSelections) => dispatch(saveSiteConfig(saveInitialSelections)),
    updateSearchFilters: (category, values) => dispatch(updateSearchFilters(category, values))
  }
}

const AppContainer = connect(null, mapDispatchToProps)(AppComponent);

export default withRouter(AppContainer);
