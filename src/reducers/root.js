import { combineReducers } from 'redux'
import agencies from './agencies'
import filters from './filters'
import siteConfig from './site-config'
import query from './query'
import searchResults from './search'
import browseFilters from './browse-filters'
import browseResults from './browse-results'
import browseSorting from './browse-sorting'
import project from './project'
import searchFilters from './search-filters'
import searchSorting from './search-sorting'
import taskFilters from './task-filters'
import taskFilterOptions from './task-filter-options'
import taskResults from './task-results'


const rootReducer = combineReducers({
  agencies,
  browseFilters,
  browseResults,
  browseSorting,
  filters,
  project,
  query,
  searchFilters,
  searchResults,
  searchSorting,
  siteConfig,
  taskFilters,
  taskFilterOptions,
  taskResults
})

export default rootReducer
