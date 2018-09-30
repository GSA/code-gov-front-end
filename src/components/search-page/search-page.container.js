import { connect } from 'react-redux';
import { getConfigValue } from 'utils'
import saveFilterOptions from 'actions/save-filter-options'
import SearchPageComponent from './search-page.component'

const mapStateToProps = ({ agencies, filters, siteConfig, searchHistory }) => {
  console.log("search-page container map state:", searchHistory)
  return {
    backgroundImage: getConfigValue(siteConfig, 'images.background'),
    currentSearchResults: searchHistory && searchHistory.length ? searchHistory[0] : null,
    filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFilterData: () => dispatch(saveFilterOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent)
