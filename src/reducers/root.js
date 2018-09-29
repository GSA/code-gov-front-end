import { combineReducers } from 'redux'
import repo from './repo'
import agencies from './agencies'
import filters from './filters'
import siteConfig from './site-config'
import query from './query'

const rootReducer = combineReducers({
  agencies,
  filters,
  query,
  repo,
  siteConfig
})

export default rootReducer
