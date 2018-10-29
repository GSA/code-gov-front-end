/* global URLSearchParams */
import { push } from 'connected-react-router'

export default function(key, value) {
  return async dispatch => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    if (Array.isArray(value)) {
      if (value.length === 0) {
        urlSearchParams.delete(key)
      } else {
        urlSearchParams.set(key, value)
      }
    } else if (value === undefined || value === null) {
      urlSearchParams.delete(key)
    } else {
      urlSearchParams.set(key, value)
    }
    const newUrl = window.location.pathname + "?" + urlSearchParams.toString()
    dispatch(push(newUrl))
  }
}