import { CLEAR_SEARCH_HISTORY, NEW_SEARCH } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_SEARCH_HISTORY:
      return null
    case NEW_SEARCH:
      console.log("searchHistory.reducer with state:", state)
      console.log("USER PASSED IN NEW_SEARCH")
      /* this automatically adds a new search to the front of the list */
      /* and then limits the search results to 5 searches */
      const previousSearches = state || [];
      return [action.results, ...previousSearches].slice(0, 5)
    default:
      return state;
  }
}