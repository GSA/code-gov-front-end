import { combineReducers } from 'redux'
import repo from './repo'
import agencies from './agencies'
import filters from './filters'
import siteConfig from './site-config'
import query from './query'
import searchHistory from './search'
import browseFilters from './browse-filters'
import browseResults from './browse-results'
import searchFilters from './search-filters'
import searchSorting from './search-sorting'
import tasks from './tasks'
import taskFilters from './task-filters'
import taskFilterOptions from './task-filter-options'

const rootReducer = combineReducers({
  agencies,
  browseFilters,
  browseResults,
  filters,
  query,
  repo,
  searchFilters,
  taskFilters,
  searchHistory,
  searchSorting,
  siteConfig,
  taskFilterOptions,
  tasks
})

export default rootReducer
