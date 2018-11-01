import { UPDATE_SEARCH_PARAMS } from 'constants/actions';

export default function (category, value) {
  return { type: UPDATE_SEARCH_PARAMS, category, value };
}