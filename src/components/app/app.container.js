import { forEach } from '@code.gov/cautious'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import updateSearchParams from 'actions/update-search-params'
import updateAgenciesParams from 'actions/update-agencies-params'
import updateTaskParams from 'actions/update-task-params'
import defaultState from 'constants/default-redux-store-state'
import { getConfigValue, now } from 'utils/other'
import { getNormalizedURLSearchParams, getSection } from 'utils/url-parsing'
import AppComponent from './app.component'

export const mapDispatchToProps = dispatch => ({
  rehydrate: () => {
    const section = getSection()
    if (section) {
      const parsed = getNormalizedURLSearchParams()
      if (section === 'browse' || section === 'search') {
        const filters = []
        forEach(['agencies', 'languages', 'licenses', 'usageTypes'], key => {
          // console.log('key:', key)
          const values = parsed[key]
          if (values) {
            // console.log('values:', values)
            values.forEach(value => {
              filters.push({ category: key, value, modified: now() })
            })
          }
        })
        const params = { filters }
        if (section === 'search') {
          const params = { filters }
          forEach(['page', 'query', 'sort', 'size'], key => {
            params[key] = parsed[key] || defaultState.searchParams[key]
          })
          dispatch(updateTaskParams(params))
        }
      } else if (section === 'tasks') {
        const filters = []
        forEach(['agencies', 'languages', 'skillLevels', 'timeRequired', 'usageTypes'], key => {
          const values = parsed[key]
          if (values) {
            values.forEach(value => {
              filters.push({ category: key, value, modified: now() })
            })
          }
        })
        const params = { filters }
        forEach(['page', 'size'], key => {
          params[key] = parsed[key] || defaultState.taskParams[key]
        })
        dispatch(updateTaskParams(params))
      } else if (section === 'agencies') {
        const filters = []
        forEach(['agencies'], key => {
          // console.log('key:', key)
          const values = parsed[key]
          if (values) {
            // console.log('values:', values)
            values.forEach(value => {
              filters.push({ category: key, value, modified: now() })
            })
          }
        })
        const params = { filters }
        if (section === 'agencies') {
          forEach(['page', 'sort', 'size'], key => {
            params[key] = parsed[key] || defaultState.agenciesParams[key]
          })
          dispatch(updateAgenciesParams(params))
        } else if (section === 'search') {
          const params = { filters }
          forEach(['page', 'query', 'sort', 'size'], key => {
            params[key] = parsed[key] || defaultState.searchParams[key]
          })
          dispatch(updateTaskParams(params))
        }
      }
    }
  }
})

const AppContainer = connect(mapDispatchToProps)(AppComponent)

export default withRouter(AppContainer)
