import { combineReducers } from 'redux'
import repo from './repo'
import agencies from './agencies'
import filters from './filters'
import siteConfig from './site-config'
import query from './query'
import searchHistory from './search'
import browseFilters from './browse-filters'
import searchFilters from './search-filters'

const rootReducer = combineReducers({
  agencies,
  browseFilters,
  filters,
  query,
  repo,
  searchFilters,
  searchHistory,
  siteConfig
})

export default rootReducer
