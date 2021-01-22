/* global URLSearchParams */
import { push } from 'connected-react-router'
import { convertObjToSortedSearchString, getURLSearchParamsAsSimpleObj } from 'utils/url-parsing'

export default function(state) {
  return dispatch => {
    const pathname = window.location.pathname
    const urlSearchParams = {}
    let storeParams
    if (pathname.includes('/browse-projects')) {
      if (state.browseParams) {
        storeParams = state.browseParams
      }
    } else if (pathname.includes('/search')) {
      if (state.searchParams) {
        storeParams = state.searchParams
      }
    } else if (pathname.includes('/agencies')) {
      if (state.agenciesParams) {
        storeParams = state.agenciesParams
      }
    }

    for (const key in storeParams) {
      const value = storeParams[key]
      if (key === 'filters' && Array.isArray(value)) {
        const params = {}
        value.forEach(({ category, value }) => {
          if (params[category]) params[category].push(value)
          else params[category] = [value]
        })
        for (const category in params) {
          urlSearchParams[category] = params[category]
        }
      } else if (typeof value === 'string') {
        urlSearchParams[key] = value
      } else if (typeof value === 'number') {
        urlSearchParams[key] = value
      }
    }

    const newURLSearchAsString = convertObjToSortedSearchString(urlSearchParams)
    const currentUrlSearchParams = convertObjToSortedSearchString(getURLSearchParamsAsSimpleObj())
    if (newURLSearchAsString !== currentUrlSearchParams) {
      let newUrl = window.location.pathname
      if (typeof currentUrlSearchParams === 'string' && currentUrlSearchParams.length > 0) {
        newUrl += `?${newURLSearchAsString}`
      }
      dispatch(push(newUrl))
    }
  }
}
