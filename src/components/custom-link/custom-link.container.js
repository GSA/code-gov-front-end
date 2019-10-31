import { connect } from 'react-redux'
import { getNormalizedURLSearchParams, getSearchFromUrl } from 'utils/url-parsing'
import { fillFilters } from 'utils/other'
import defaultState from 'constants/default-redux-store-state'
import updateBrowseParams from 'actions/update-browse-params'
import updateSearchParams from 'actions/update-search-params'
import updateTaskParams from 'actions/update-task-params'
import CustomLinkComponent from './custom-link.component'

export const mapDispatchToProps = (dispatch, _ownProps) => ({
  updateStore: to => {
    console.log('starting updateStore with to', to)
    // this basically intercepts user clicks on links
    // and updates the redux store based on them
    const search = getSearchFromUrl(to)
    console.log('search:', search)
    const params = getNormalizedURLSearchParams(search)
    console.log('params:', params)
    let categories = ['agencies', 'languages', 'licenses', 'usageType']
    if (to.startsWith('/browse')) {
      const result = {
        page: params.page || defaultState.browseParams.page,
        size: params.size || defaultState.browseParams.size,
        sort: params.sort || defaultState.browseParams.sort,
        filters: []
      }
      fillFilters(categories, params, result)
      dispatch(updateBrowseParams(result))
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
        page: params.page || defaultState.browseParams.page,
        size: params.size || defaultState.browseParams.size,
        filters: []
      }

      categories = ['agencies', 'categories', 'languages', 'skillLevels', 'timeRequired']
      fillFilters(categories, params, result)
      dispatch(updateTaskParams(result))
    }
  }
})

export default connect(
  null,
  mapDispatchToProps
)(CustomLinkComponent)
