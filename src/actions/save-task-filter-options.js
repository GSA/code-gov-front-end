/* global fetch */
import { SAVE_TASK_FILTER_OPTIONS } from 'constants/actions';

export default function () {
  return async dispatch => {
    /*
    const url = "http://127.0.0.1:8081/filters/tasks.json"
    const response = await fetch(url);
    const options = await response.json();
    */
    const options = {"agencies":[{"name":"Consumer Financial Protection Bureau","value":"CFPB"},{"name":"Department of Labor","value":"DOL"},{"name":"General Services Administration","value":"GSA"},{"name":"National Aeronautics and Space Administration","value":"NASA"},{"name":"National Security Agency","value":"NSA"},{"name":"Social Security Administration","value":"SSA"}],"categories":[{"name":"Enhancement","value":"enhancement"},{"name":"Bug","value":"bug"}],"languages":[{"name":"CSS","value":"css"},{"name":"HTML","value":"html"},{"name":"JavaScript","value":"javascript"},{"name":"PHP","value":"php"},{"name":"Python","value":"python"},{"name":"TypeScript","value":"typescript"}],"skillLevels":[{"name":"Small","value":"small"},{"name":"Medium","value":"medium"},{"name":"Large","value":"large"}],"timeRequired":[{"name":"Small","value":"small"},{"name":"Medium","value":"medium"},{"name":"Large","value":"large"}]}
    dispatch({ type: SAVE_TASK_FILTER_OPTIONS, options })
  }
}
