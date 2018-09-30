import { UPDATE_QUERY } from 'constants/actions';

export default function (query) {
  return { type: UPDATE_QUERY, query };
}