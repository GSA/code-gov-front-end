import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { getConfigValue, normalize, now } from 'utils/other'
import saveAgencies from 'actions/save-agencies'
import updateBrowseParams from 'actions/update-browse-params'
import HomeBannerComponent from './home-banner.component'

export const mapStateToProps = ({ agencies }) => {
  return {
    agencies,
    backgroundImage: getConfigValue('images.background'),
    motto: getConfigValue('content.home.banner.motto'),
    subtitle: getConfigValue('content.home.banner.subtitle'),
    helpWantedTitle: getConfigValue('content.home.banner.help_wanted.title'),
    helpWantedDescription: getConfigValue('content.home.banner.help_wanted.description'),
    helpWantedButton: getConfigValue('content.home.banner.help_wanted.button'),
    issueUrl: getConfigValue('content.home.banner.issue_url'),
    newsletterUrl: getConfigValue('content.home.banner.newsletter_url'),
    browseByText: getConfigValue('content.home.banner.browse_by_text')
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onBrowseByEntityChange: event => {
      const value = normalize(event.target.value)
      if (value !== 'browse by agency') {
        let url
        const params = {
          page: 1,
          size: 10,
          sort: 'data_quality',
          filters: []
        }
        if (value === 'all') {
          url = '/browse-projects?page=1&size=10&sort=data_quality'
        } else {
          url =`/browse-projects?agencies=${value}&page=1&size=10&sort=data_quality`
          params.filters.push({ category: 'agencies', value, modified: now() })
        }
        // we can't use updateBrowseFilters because of
        // https://github.com/GSA/code-gov-front-end/issues/130
        dispatch(updateBrowseParams(params))
        dispatch(push(url))
      }
    },
    saveAgencies: () => dispatch(saveAgencies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerComponent)
