import { UPDATE_BROWSE_PARAMS } from 'constants/actions';

export default function (category, value) {
  return { type: UPDATE_BROWSE_PARAMS, category, value };
}