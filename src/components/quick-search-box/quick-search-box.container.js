import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import updateSearchParams from 'actions/update-search-params'
import { getSection } from 'utils/url-parsing'
import QuickSearchBoxComponent from './quick-search-box.component'

export const mapStateToProps = ({ searchParams }) => ({
  query: searchParams ? searchParams.query : undefined
})

export const mapDispatchToProps = dispatch => ({
  onSubmit: query => {
    dispatch(
      updateSearchParams({
        page: 1,
        size: 10,
        sort: 'best_match',
        query
      })
    )
    if (getSection() !== 'search') {
      dispatch(push(`/search?page=1&query=${query}&size=10&sort=best_match`))
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickSearchBoxComponent)
