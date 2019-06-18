export default function(PAGE) {
  return function(state = null, action) {
    switch (action.type) {
      case `UPDATE_${PAGE}_RESULTS`:
        return action.results
      default:
        return state
    }
  }
}
