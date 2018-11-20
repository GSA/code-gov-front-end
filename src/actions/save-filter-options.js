/* global PUBLIC_PATH */
/* global fetch */
import { SAVE_FILTER_OPTIONS } from 'constants/actions';

export default function () {
  return async dispatch => {
    const url = PUBLIC_PATH + "assets/data/filters/repos.json"
    const response = await fetch(url);
    const options = await response.json();
    dispatch({ type: SAVE_FILTER_OPTIONS, options })
  }
}