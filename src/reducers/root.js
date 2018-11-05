import { combineReducers } from 'redux'
import agencies from './agencies'
import filters from './filters'

import project from './project'

import taskFilterOptions from './task-filter-options'

import createParamsReducer from 'utils/reducers/create-params-reducer'
import createResultsReducer from 'utils/reducers/create-results-reducer'

const rootReducer = combineReducers({
  agencies,
  browseParams: createParamsReducer('BROWSE'),
  browseResults: createResultsReducer('BROWSE'),
  filters,
  project,
  searchParams: createParamsReducer('SEARCH'),
  searchResults: createResultsReducer('SEARCH'),
  taskParams: createParamsReducer('TASK'),
  taskFilterOptions,
  taskResults: createResultsReducer('TASK')
})

export default rootReducer
