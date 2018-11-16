import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import updateSearchParams from 'actions/update-search-params'
import HomeBannerSearchBoxComponent from './home-banner-search-box.component'
import { getConfigValue } from 'utils/other'


const mapStateToProps = ({ query }) => {
  return {
    placeholder: getConfigValue('content.home.banner.search_placeholder_text'),
    searchDescriptionText: getConfigValue('content.home.banner.search_description_text'),
    searchDescriptionTextMobile: getConfigValue('content.home.banner.search_description_text_mobile'),
    query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (query) => {
      console.log("home-banner-search-box.container starting onSubmit with query:", query)
      dispatch(updateSearchParams({ query, size: 100 }))
      dispatch(push(`/search?query=${query}`))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerSearchBoxComponent)
