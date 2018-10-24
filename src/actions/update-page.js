/* global URLSearchParams */
import { push } from 'connected-react-router'

export default function(newPage) {
  return async dispatch => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    urlSearchParams.set('page', newPage)
    const newUrl = window.location.pathname + "?" + urlSearchParams.toString()
    dispatch(push(newUrl))
  }
}