import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { getConfigValue, normalize } from 'utils/other'
import saveAgencies from 'actions/save-agencies'
import updateBrowseFilters from 'actions/update-browse-filters'
import HomeBannerComponent from './home-banner.component'

const mapStateToProps = ({ agencies }) => {
  return {
    agencies,
    backgroundImage: getConfigValue('images.background'),
    motto: getConfigValue('content.home.banner.motto'),
    subtitle: getConfigValue('content.home.banner.subtitle'),
    helpWantedTitle: getConfigValue('content.home.banner.help_wanted.title'),
    helpWantedDescription: getConfigValue('content.home.banner.help_wanted.description'),
    helpWantedButton: getConfigValue('content.home.banner.help_wanted.button'),
    issueUrl: getConfigValue('content.home.banner.issue_url'),
    searchDescriptionText: getConfigValue('content.home.banner.search_description_text'),
    searchDescriptionTextMobile: getConfigValue('content.home.banner.search_description_text_mobile'),
    browseByText: getConfigValue('content.home.banner.browse_by_text')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBrowseByEntityChange: event => {
      const value = normalize(event.target.value)
      if (value !== 'browse by agency') {
        let url = '/browse-projects'
        if (value !== 'all') {
          url += '?agencies=' + value
          dispatch(updateBrowseFilters('agencies', value, 'checked'))
        }
        dispatch(push(url))
      }
    },
    saveAgencies: () => dispatch(saveAgencies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerComponent)
