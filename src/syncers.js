import clearSearchResults from 'actions/clear-search-results'

import updateAgenciesResults from 'actions/update-agencies-results'
import updateBrowseResults from 'actions/update-browse-results'
import updateSearchResults from 'actions/update-search-results'
import updateTaskResults from 'actions/update-task-results'

import syncURLSearchParams from 'actions/sync-url-search-params'

let count = 0

/*
  This was originally put in to prevent the app from spinning out of control
  and accidentally making hundreds of API calls.
*/
const threshold = 50

const syncers = [
  /*
    This syncer updates your url when the user changes pages, searches
    for something, or selects a filter option.

    For example, this is what updates page=2 to page=3 in the url
    when a user changes pages in /browse-projects
  */
  {
    select: state => [
      state.router.location.pathname,
      state.agenciesParams,
      state.searchParams,
      state.taskParams
    ],
    sync: (state, dispatch) => {
      console.log('syncing url search params')
      dispatch(syncURLSearchParams(state))
    }
  },
  {
    /*
      This is what listens to browse parameters like language, agency,
      license, usage type and page number and then updates the results
      when the user selects something in one of the filter boxes
      or clicks to view another page of the browse results.
    */
    select: state => state.browseParams,
    sync: (state, dispatch) => {
      console.warn('browseParams changed')
      count += 1
      if (count < threshold) {
        dispatch(updateBrowseResults(state.browseParams))
      } else {
        console.error('count is greater than threshold so not fetching')
      }
    }
  },
  {
    /*
      This is what listens to browse parameters like language, agency,
      license, usage type and page number and then updates the results
      when the user selects something in one of the filter boxes
      or clicks to view another page of the browse results.
    */
    select: state => state.agenciesParams,
    sync: (state, dispatch) => {
      console.warn('agenciesParams changed')
      count += 1
      if (count < threshold) {
        dispatch(updateAgenciesResults(state.agenciesParams))
      } else {
        console.error('count is greater than threshold so not fetching')
      }
    }
  },
  {
    /*
      This is much like the syncer above, but also listens for search terms
      and updates the search results when the user makes a change.
    */
    select: state => state.searchParams,
    sync: (state, dispatch) => {
      console.warn('searchParams changed')
      count += 1
      if (count < threshold) {
        if (state.searchParams && state.searchParams.query && state.searchParams.query !== '') {
          dispatch(updateSearchResults(state.searchParams))
        } else {
          dispatch(clearSearchResults())
        }
      }
    }
  }
]

export default syncers
