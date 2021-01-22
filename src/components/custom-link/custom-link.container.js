import { connect } from 'react-redux'
import { getNormalizedURLSearchParams, getSearchFromUrl } from 'utils/url-parsing'
import { fillFilters } from 'utils/other'
import defaultState from 'constants/default-redux-store-state'
import updateAgenciesParams from 'actions/update-agencies-params'
import updateSearchParams from 'actions/update-search-params'
import updateTaskParams from 'actions/update-task-params'
import CustomLinkComponent from './custom-link.component'

export const mapDispatchToProps = (dispatch, _ownProps) => ({
  updateStore: to => {
    console.log('starting updateStore with to', to)
    // this basically intercepts user clicks on links
    // and updates the redux store based on them
    const search = getSearchFromUrl(to)
    // console.log('search:', search)
    const params = getNormalizedURLSearchParams(search)
    // console.log('params:', params)
    let categories = ['agencies', 'languages', 'licenses', 'usageType']
    if (to.startsWith('/agencies')) {
      const result = {
        page: params.page || defaultState.agenciesParams.page,
        size: params.size || defaultState.agenciesParams.size,
        sort: params.sort || defaultState.agenciesParams.sort,
        filters: []
      }
      fillFilters(categories, params, result)
      dispatch(updateAgenciesParams(result))
    } else if (to.startsWith('/search')) {
      const result = {
        page: params.page || defaultState.searchParams.page,
        query: params.query || defaultState.searchParams.query,
        size: params.size || defaultState.searchParams.size,
        sort: params.sort || defaultState.searchParams.sort,
        filters: []
      }
      fillFilters(categories, params, result)
      dispatch(updateSearchParams(result))
    } else if (to.startsWith('/open-tasks')) {
      const result = {
        page: params.page || defaultState.agenciesParams.page,
        size: params.size || defaultState.agenciesParams.size,
        filters: []
      }

      categories = ['agencies', 'categories', 'languages', 'skillLevels', 'timeRequired']
      fillFilters(categories, params, result)
      dispatch(updateTaskParams(result))
    }
  }
})

export default connect(null, mapDispatchToProps)(CustomLinkComponent)
