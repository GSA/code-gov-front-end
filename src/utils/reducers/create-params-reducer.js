import assign from 'lodash.assign'
import { now } from 'utils/other'

export default function(PAGE) {
  return function (state = null, action) {
    switch(action.type) {
      case `UPDATE_${PAGE}_FILTERS`:
        const { category, value, intent } = action
        if (intent === 'remove') {
          state.filters = state.filters.filter(item => !(item.category === category && item.value === value))
        } else if (intent === 'add') {
          state.filters.push({ category, value, modified: now() })
        }
        return state
      case `UPDATE_${PAGE}_PARAMS`:
        return assign(state || {}, action.data)
      default:
        return state;
    }
  }
}
