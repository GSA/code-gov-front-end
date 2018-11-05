import clearSearchResults from 'actions/clear-search-results'

import updateBrowseResults from 'actions/update-browse-results'
import updateSearchResults from 'actions/update-search-results'
import updateTaskResults from 'actions/update-task-results'

import syncURLSearchParams from 'actions/sync-url-search-params'

let count = 0
let threshold = 20

const syncers = [

  {
    select: state => ([
      state.router.location.pathname,
      state.browseParams,
      state.searchParams,
      state.taskParams
    ]),
    sync: (state, dispatch) => {
      console.log("syncing url search params")
      dispatch(syncURLSearchParams(state))
    }
  },
  {
    select: state => state.browseParams,
    sync: (state, dispatch) => {
      console.warn("browseParams changed")
      count++
      if (count < threshold) {
        dispatch(updateBrowseResults(state.browseParams))
      } else {
        console.error("count is greater than threshold so not fetching")
      }
    }
  },
  {
    select: state => state.searchParams,
    sync: (state, dispatch) => {
      console.warn("searchParams changed")
      count++
      if (count < threshold) {
        if (state.searchParams && state.searchParams.query && state.searchParams.query !== '') {
          dispatch(clearSearchResults())
        } else {
          dispatch(updateSearchResults(state.searchParams))
        }
      }
    }
  },
  {
    select: state => state.taskParams,
    sync: (state, dispatch) => {
      console.warn("detected change to task params")
      count++
      if (count < threshold) {
        dispatch(updateTaskResults(state.taskParams))
      }
    }
  }
]

export default syncers