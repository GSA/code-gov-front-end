import { UPDATE_SEARCH_SORTING } from 'constants/actions';

export default function (value) {
  return { type: UPDATE_SEARCH_SORTING, value };
}