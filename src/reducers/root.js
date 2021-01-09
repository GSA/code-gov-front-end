import { combineReducers } from 'redux'
import createParamsReducer from 'utils/reducers/create-params-reducer'
import createResultsReducer from 'utils/reducers/create-results-reducer'
import agencies from './agencies'
import filters from './filters'

import project from './project'

import taskFilterOptions from './task-filter-options'

import displayMobileMenu from './mobile-menu'
import expandedMobileMenuOptions from './expanded-mobile-menu-options'
import searchDropdown from './search-dropdown'

const rootReducer = combineReducers({
  agencies,
  agenciesParams: createParamsReducer('AGENCIES'),
  agenciesResults: createResultsReducer('AGENCIES'),
  displayMobileMenu,
  expandedMobileMenuOptions,
  filters,
  project,
  searchDropdown,
  searchParams: createParamsReducer('SEARCH'),
  searchResults: createResultsReducer('SEARCH'),
  taskParams: createParamsReducer('TASK'),
  taskFilterOptions,
  taskResults: createResultsReducer('TASK')
})

export default rootReducer
