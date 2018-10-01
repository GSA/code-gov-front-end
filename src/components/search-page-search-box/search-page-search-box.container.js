/* global URLSearchParams */

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

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

      const urlSearchParams = new URLSearchParams(window.location.search)
      urlSearchParams.set('query', query)
      const newUrl = window.location.pathname + "?" + urlSearchParams.toString()
      dispatch(push(newUrl))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageSearchBoxComponent)
