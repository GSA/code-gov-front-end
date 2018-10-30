import { combineReducers } from 'redux'
import agencies from './agencies'
import filters from './filters'
import siteConfig from './site-config'
import query from './query'
import searchResults from './search'
import browseParams from './browse-params'
import browseResults from './browse-results'
import project from './project'
import searchParams from './search-params'
import taskFilters from './task-filters'
import taskFilterOptions from './task-filter-options'
import taskResults from './task-results'


const rootReducer = combineReducers({
  agencies,
  browseParams,
  browseResults,
  filters,
  project,
  query,
  searchParams,
  searchResults,
  siteConfig,
  taskFilters,
  taskFilterOptions,
  taskResults
})

export default rootReducer
