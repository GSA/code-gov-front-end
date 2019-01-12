import { UPDATE_BROWSE_PARAMS } from 'constants/actions'

export default function(data) {
  return { type: UPDATE_BROWSE_PARAMS, data }
  /* return async (dispatch, getState) => {
    //dispatch(updateBrowseResults({...getState().browseParams, category: values}))
    dispatch({ type: UPDATE_BROWSE_PARAMS, category, value })
  } */
}
