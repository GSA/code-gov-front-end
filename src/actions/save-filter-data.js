import { SAVE_FILTER_DATA } from 'constants/actions';
import client from 'api'

export default function () {
  return async dispatch => {
    const url = "https://raw.githubusercontent.com/GSA/code-gov-data/master/filters/all.json"
    /* global fetch */
    const response = await fetch(url);
    console.log("response:", response);
    const data = await response.json();
    console.log("data:", data);
    dispatch({ type: SAVE_FILTER_DATA, data })
  }
}