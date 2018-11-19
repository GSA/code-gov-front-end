import { forEach } from '@code.gov/cautious'
import AppComponent from './app.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import loadProject from 'actions/load-project'
import updateBrowseParams from 'actions/update-browse-params'
import updateSearchParams from 'actions/update-search-params'
import updateTaskParams from 'actions/update-task-params'
import {
  getNormalizedURLSearchParams,
  getSection
} from 'utils/url-parsing'
import { getConfigValue, now } from 'utils/other'
import defaultState from 'constants/default-redux-store-state'

const mapStateToProps = () => {
  return {
    plugins: getConfigValue('plugins'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rehydrate: () => {
      const section = getSection()
      if (section) {
        const parsed = getNormalizedURLSearchParams()
        if (section === 'browse' || section === 'search') {
          const filters = []
          forEach(['agencies', 'languages', 'licenses', 'usageTypes'], key => {
            console.log("key:", key)
            if (parsed[key]) {
              const values = parsed[key]
              if (values) {
                console.log("values:", values)
                values.forEach(value => {
                  filters.push({ category: key, value, modified: now() })
                })
              }
            }
          })
          const params = { filters }
          if (section === 'browse') {
            forEach(['page', 'sort', 'size'], key => {
              params[key] = parsed[key] || defaultState.browseParams[key]
            })
            dispatch(updateBrowseParams(params))
          } else if (section === 'search') {
            const params = { filters }
            forEach(['page', 'query', 'sort', 'size'], key => {
              params[key] = parsed[key] || defaultState.searchParams[key]
            })
            dispatch(updateSearchParams(params))
          }
        } else if (section === 'tasks') {
          const filters = []
          forEach(['agencies', 'languages', 'skillLevels', 'timeRequired', 'usageTypes'], key => {
            if (parsed[key]) {
              const values = parsed[key]
              if (values) {
                values.forEach(value => {
                  filters.push({ category: key, value, modified: now() })
                })
              }
            }
          })
          const params = { filters }
          forEach(['page', 'size'], key => {
            params[key] = parsed[key] || defaultState.taskParams[key]
          })
          dispatch(updateTaskParams(params))
        } else {
        }
      }

    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default withRouter(AppContainer);
