import { UPDATE_SEARCH_FILTERS } from 'constants/actions';

export default function (category, values) {
  return { type: UPDATE_SEARCH_FILTERS, category, values };
}