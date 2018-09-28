import { combineReducers } from 'redux'
import repo from './repo'
import agencies from './agencies'
import filters from './filters'
import siteConfig from './site-config'

const rootReducer = combineReducers({
  agencies,
  filters,
  repo,
  siteConfig
})

export default rootReducer
