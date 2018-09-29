import { connect } from 'react-redux'
import updateQuery from 'actions/update-query'
import GlobalSearchBoxComponent from './global-search-box.component'

const mapStateToProps = ({ query }) => {
  return {
    query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuery: (query) => {
      console.log("starting props.updateQuery")
      dispatch(updateQuery(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearchBoxComponent)
