import { connect } from 'react-redux'
import newSearch from 'actions/new-search'
import SearchPageSearchBoxComponent from './search-page-search-box.component'

const mapStateToProps = ({ query, siteConfig }) => {
  return {
    query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (query) => {
      console.log("home-banner-search-box.container starting onSubmit with query:", query)
      dispatch(newSearch(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageSearchBoxComponent)
