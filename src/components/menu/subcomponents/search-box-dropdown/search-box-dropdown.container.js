import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import hideSearchDropdown from 'actions/hide-search-dropdown'
import updateSearchParams from 'actions/update-search-params'
import { getSection } from 'utils/url-parsing'
import SearchBoxDropDownComponent from './search-box-dropdown.component'

export const mapStateToProps = ({ searchDropdown }) => ({
  searchDropdown
})

export const mapDispatchToProps = dispatch => ({
  hideSearchDropdown: () => dispatch(hideSearchDropdown()),
  onSubmit: query => {
    if (getSection() === 'search') {
      dispatch(updateSearchParams({ page: 1, query }))
    } else {
      dispatch(
        updateSearchParams({
          page: 1,
          query,
          size: 10,
          sort: 'best_match'
        })
      )
      dispatch(push(`/search?page=1&query=${query}&size=10&sort=best_match`))
    }
    dispatch(hideSearchDropdown())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBoxDropDownComponent)
