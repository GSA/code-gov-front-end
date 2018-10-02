import { UPDATE_BROWSE_FILTERS } from 'constants/actions';

export default function (category, values) {
  return { type: UPDATE_BROWSE_FILTERS, category, values };
}