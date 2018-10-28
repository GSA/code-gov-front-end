import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { getConfigValue, normalize } from 'utils/other'
import saveAgencies from 'actions/save-agencies'
import updateBrowseFilters from 'actions/update-browse-filters'
import HomeBannerComponent from './home-banner.component'

const mapStateToProps = ({ agencies, siteConfig }) => {
  return {
    agencies,
    backgroundImage: getConfigValue(siteConfig, 'images.background'),
    motto: getConfigValue(siteConfig, 'content.home.banner.motto'),
    subtitle: getConfigValue(siteConfig, 'content.home.banner.subtitle'),
    helpWantedTitle: getConfigValue(siteConfig, 'content.home.banner.help_wanted.title'),
    helpWantedDescription: getConfigValue(siteConfig, 'content.home.banner.help_wanted.description'),
    helpWantedButton: getConfigValue(siteConfig, 'content.home.banner.help_wanted.button'),
    issueUrl: getConfigValue(siteConfig, 'content.home.banner.issue_url'),
    searchDescriptionText: getConfigValue(siteConfig, 'content.home.banner.search_description_text'),
    searchDescriptionTextMobile: getConfigValue(siteConfig, 'content.home.banner.search_description_text_mobile'),
    browseByText: getConfigValue(siteConfig, 'content.home.banner.browse_by_text')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBrowseByEntityChange: event => {
      const value = event.target.value
      if (value !== 'Browse by Agency') {
        let url = '/browse-projects'
        if (value !== 'All') {
          url += '?agencies=' + value
          dispatch(updateBrowseFilters('agencies', normalize(value)))
        }
        dispatch(push(url))
      }
    },
    saveAgencies: () => dispatch(saveAgencies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerComponent)
