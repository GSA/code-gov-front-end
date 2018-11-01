import AppComponent from './app.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import newSearch from 'actions/new-search'
import loadProject from 'actions/load-project'
import updateBrowseParams from 'actions/update-browse-params'
import updateSearchParams from 'actions/update-search-params'
import { getConfigValue } from 'utils/other'

const mapStateToProps = () => {
  return {
    plugins: getConfigValue('plugins')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialSearch: (query) => {
      dispatch(newSearch(query))
    },
    loadProject: repoID => dispatch(loadProject(repoID)),
    updateBrowseParams: (category, value) => dispatch(updateBrowseParams(category, value)),
    updateSearchParams: (category, value) => dispatch(updateSearchParams(category, value))
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default withRouter(AppContainer);
