import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import hideSearchDropdown from 'actions/hide-search-dropdown'
import SearchBoxDropDownComponent from './search-box-dropdown.component'
import updateSearchParams from 'actions/update-search-params'

const mapStateToProps = ({ searchDropdown }) => {
  return {
    searchDropdown
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSearchDropdown: () => dispatch(hideSearchDropdown()),
    onSubmit: query => {
      console.log("home-banner-search-box.container starting onSubmit with query:", query)
      dispatch(updateSearchParams({ query, size: 100 }))
      dispatch(push(`/search?query=${query}`))
      dispatch(hideSearchDropdown())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoxDropDownComponent)
