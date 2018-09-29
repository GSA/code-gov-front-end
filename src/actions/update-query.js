import { UPDATE_QUERY } from 'constants/actions';

export default function (query) {
    console.log("running update-query function with", query)
  return { type: UPDATE_QUERY, query };
}