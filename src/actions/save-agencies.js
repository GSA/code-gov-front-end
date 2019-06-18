import { SAVE_AGENCIES } from 'constants/actions'
import client from 'api-client'

export default function() {
  return async dispatch => {
    const numAgencies = 1000
    const agencies = await client.getAgencies(numAgencies)
    dispatch({ type: SAVE_AGENCIES, agencies })
  }
}
