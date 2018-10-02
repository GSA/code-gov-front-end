import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import updateQuery from 'actions/update-query'
import newSearch from 'actions/new-search'
import HomeBannerSearchBoxComponent from './home-banner-search-box.component'
import { getConfigValue } from 'utils'


const mapStateToProps = ({ query, siteConfig }) => {
  return {
    searchPlaceholder: getConfigValue(siteConfig, 'content.home.banner.search_placeholder_text'),
    query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (query) => {
      console.log("home-banner-search-box.container starting onSubmit with query:", query)
      //dispatch(updateQuery(query))
      dispatch(newSearch(query))
      dispatch(push(`/search?query=${query}`))
    },
    updateQuery: (query) => {
      //console.log("starting props.updateQuery")
      //dispatch(updateQuery(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerSearchBoxComponent)
