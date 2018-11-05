/* global URLSearchParams */

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import updateSearchParams from 'actions/update-search-params'
import QuickSearchBoxComponent from './quick-search-box.component'

const mapStateToProps = ({ searchParams }) => {
  return {
    query: searchParams ? searchParams.query : undefined
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: query => {
      dispatch(updateSearchParams( { query }))
      if (!window.location.pathname.includes('/search')) {
        dispatch(push('/search'))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearchBoxComponent)
