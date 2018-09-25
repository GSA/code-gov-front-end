import { combineReducers } from 'redux'
import repo from './repo'
import agencies from './agencies'
import siteConfig from './site-config'

const rootReducer = combineReducers({
  agencies,
  repo,
  siteConfig
})

export default rootReducer
