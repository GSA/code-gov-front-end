import { SAVE_FILTER_OPTIONS } from 'constants/actions';

export default function () {
  return async dispatch => {
    const url = "https://raw.githubusercontent.com/GSA/code-gov-data/master/filters/all.json"
    /* global fetch */
    const response = await fetch(url);
    const options = await response.json();
    dispatch({ type: SAVE_FILTER_OPTIONS, options })
  }
}