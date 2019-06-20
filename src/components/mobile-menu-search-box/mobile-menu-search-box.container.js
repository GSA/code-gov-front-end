import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import hideMobileMenu from 'actions/hide-mobile-menu'
import collapseAllMobileMenuOptions from 'actions/collapse-all-mobile-menu-options'
import updateSearchParams from 'actions/update-search-params'
import { getSection } from 'utils/url-parsing'
import MobileMenuSearchBoxComponent from './mobile-menu-search-box.component'

export const mapDispatchToProps = dispatch => ({
  onSubmit: query => {
    dispatch(
      updateSearchParams({
        page: 1,
        size: 10,
        query,
        filters: []
      })
    )
    if (getSection() !== 'search') {
      dispatch(push(`/search?page=1&query=${query}&size=10&sort=best_match`))
    }
    dispatch(collapseAllMobileMenuOptions())
    dispatch(hideMobileMenu())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(MobileMenuSearchBoxComponent)
