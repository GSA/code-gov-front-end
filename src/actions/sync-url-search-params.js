/* global URLSearchParams */
import { push } from 'connected-react-router'
import { setArrayAsParam, setNumberAsParam, setStringAsParam } from 'utils/url-setting'
import { some } from '@code.gov/cautious'

export default function(state) {
  return async dispatch => {
    const pathname = window.location.pathname
    const urlSearchParams = new URLSearchParams()
    let storeParams
    if (pathname.includes('/browse-projects')) {
      if (state.browseParams) {
        storeParams = state.browseParams
      }
    } else if (pathname.includes('/search')) {
      if (state.searchParams) {
        storeParams = state.searchParams
      }
    } else if (pathname.includes('/open-tasks')) {
      if (state.taskFilters) {
        storeParams = state.taskFilters
      }
    }

    for (let key in storeParams) {
      const value = storeParams[key]
      if (key === 'filters' && Array.isArray(value)) {
        const params = {}
        value.forEach(({ category, value }) => {
          if (params[category]) params[category].push(value)
          else params[category] = [value]
        })
        for (let category in params) {
          setArrayAsParam(urlSearchParams, category, params[category])
        }
      } else if (typeof value === 'string') {
        setStringAsParam(urlSearchParams, key, value)
      } else if (typeof value === 'number') {
        setNumberAsParam(urlSearchParams, key, value)
      }
    }

    /*
      URLSearchParam's toString method URL encodes commas.
      Let's not do that for string legibility purposes.
      Very few browsers don't support commas in urls these days.
    */
    const newUrl = (window.location.pathname + "?" + urlSearchParams.toString()).replace('%2C', ',')
    dispatch(push(newUrl))
  }
}