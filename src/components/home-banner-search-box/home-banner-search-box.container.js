import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import clearSearchResults from 'actions/clear-search-results'
import updateSearchParams from 'actions/update-search-params'
import { getConfigValue } from 'utils/other'
import { getSection } from 'utils/url-parsing'
import HomeBannerSearchBoxComponent from './home-banner-search-box.component'

export const mapStateToProps = ({ query }) => ({
  placeholder: getConfigValue('content.home.banner.search_placeholder_text'),
  searchDescriptionHeading: getConfigValue('content.home.banner.search_description_heading'),
  searchDescriptionText: getConfigValue('content.home.banner.search_description_text'),
  searchDescriptionTextMobile: getConfigValue('content.home.banner.search_description_text_mobile'),
  query
})

export const mapDispatchToProps = dispatch => ({
  onSubmit: query => {
    console.log('home-banner-search-box.container starting onSubmit with query:', query)
    if (getSection() === 'search') {
      dispatch(updateSearchParams({ page: 1, query, size: 10 }))
    } else {
      dispatch(updateSearchParams({ page: 1, query, size: 10, sort: 'best_match', filters: [] }))
      dispatch(push(`/search?page=1&query=${query}&size=10&sort=best_match`))
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBannerSearchBoxComponent)
