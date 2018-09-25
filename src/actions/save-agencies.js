import { SAVE_AGENCIES } from 'constants/actions';
//import client from '../api'

export default function () {
  return async dispatch => {
    const agencies = await client.getAgencies(size=1000)
    dispatch({ type: SAVE_AGENCIES, agencies })
  }
}