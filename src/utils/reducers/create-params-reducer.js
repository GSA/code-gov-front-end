import assign from 'lodash.assign'
import { now } from 'utils/other'

export default function(PAGE) {
  return function(state = null, action) {
    switch (action.type) {
      case `UPDATE_${PAGE}_FILTERS`:
        const { category, value, intent } = action

        // normalization
        const categoryInLowerCase = category.toLowerCase()
        const valueInLowerCase = value.toLowerCase()

        if (intent === 'remove') {
          state.filters = state.filters.filter(
            item =>
              !(
                item.category.toLowerCase() === categoryInLowerCase &&
                item.value.toLowerCase() === valueInLowerCase
              )
          )
        } else if (intent === 'add') {
          state.filters.push({ category, value, modified: now() })
        }

        // if we're updating the filters, the user will also expect to go back to page 1
        state.page = 1

        return state
      case `UPDATE_${PAGE}_PARAMS`:
        return assign(state || {}, action.data)
      default:
        return state
    }
  }
}
