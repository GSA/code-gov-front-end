/* global URLSearchParams */

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import newSearch from 'actions/new-search'
import updateUrlParam from 'actions/update-url-param'
import QuickSearchBoxComponent from './quick-search-box.component'

const mapStateToProps = ({ query }) => {
  return {
    query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (query) => {
      dispatch(push('/search'))
      dispatch(newSearch(query))
      dispatch(updateUrlParam('query', query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearchBoxComponent)
