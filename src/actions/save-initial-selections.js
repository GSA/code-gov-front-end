import { SAVE_INITIAL_SELECTIONS } from 'constants/actions';

function getParam(params, name) {
  return params.has(name) ? params.get(name).split(',') : null
}

export default function () {
  return async dispatch => {
    /* global URLSearchParams */
    const params = new URLSearchParams(window.location.search);
    const selections = {
      agencies: getParam(params, 'agencies'),
      languages: getParam(params, 'languages'),
      licenses: getParam(params, 'licenses')
    }
    dispatch({ type: SAVE_INITIAL_SELECTIONS, selections })
  }
}