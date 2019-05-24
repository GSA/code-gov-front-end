import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import updateSearchParams from 'actions/update-search-params'
import HomeBannerSearchBoxComponent from './home-banner-search-box.component'
import { getConfigValue } from 'utils/other'
import { getSection } from 'utils/url-parsing'


export const mapStateToProps = ({ query }) => {
  return {
    placeholder: getConfigValue('content.home.banner.search_placeholder_text'),
    searchDescriptionText: getConfigValue('content.home.banner.search_description_text'),
    searchDescriptionTextMobile: getConfigValue('content.home.banner.search_description_text_mobile'),
    query
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (query) => {
      console.log("home-banner-search-box.container starting onSubmit with query:", query)
      // BUG: the first condition here is never true when this action creator
      // is called. The browser is still on the homepage, so getSection returns
      // undefined
      if (getSection() === 'search') {
        dispatch(updateSearchParams({ page: 1, query, size: 10 }))
      } else {
        dispatch(updateSearchParams({ page: 1, query, size: 10, sort: 'best_match' }))
        dispatch(push(`/search?page=1&query=${query}&size=10&sort=best_match`))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerSearchBoxComponent)
