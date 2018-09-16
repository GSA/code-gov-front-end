import { combineReducers } from 'redux'
import repo from './repo'
import siteConfig from './site-config'

const rootReducer = combineReducers({
  repo,
  siteConfig
})

export default rootReducer
