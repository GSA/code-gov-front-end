/* global URLSearchParams */

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { includes, length } from '@code.gov/cautious'
import get from 'lodash.get'
import { getConfigValue, getFilterData, normalize } from 'utils'
import saveFilterOptions from 'actions/save-filter-options'
import updateBrowseFilters from 'actions/update-browse-filters'
import updateBrowseResults from 'actions/update-browse-results'
import updatePage from 'actions/update-page'
import BrowseProjectsComponent from './browse-projects.component'

const mapStateToProps = ({ browseFilters, browseResults, filters, siteConfig }) => {

  const selectedAgencies = normalize(browseFilters ? browseFilters.agencies : [])
  const selectedLicenses = normalize(browseFilters ? browseFilters.licenses : [])
  const selectedLanguages = normalize(browseFilters ? browseFilters.languages : [])
  const selectedUsageTypes = normalize(browseFilters ? browseFilters.usageTypes : [])
  const selectedPage = get(browseFilters, 'page') || 1
  const selectedPageSize = get(browseFilters, 'pageSize') || 10

  /* initialize filters to empty arrays */
  let agencies = []
  let languages = []
  let licenses = []
  let usageTypes = []

  /* filters are a list of { value, name } objects including all options found
     within the code.gov data */
  if (filters) {
    if (filters.agencies) {
      agencies = filters.agencies.map(({ name, value}) => {
        return { name, value, checked: includes(selectedAgencies, normalize(value)) }
      })
    }
    if (filters.languages) {
      languages = filters.languages.map(({name, value}) => {
        return { name, value, checked: includes(selectedLanguages, normalize(value)) }
      })
    }
    if (filters.licenses) {
      licenses = filters.licenses.map(({name, value}) => {
        return { name, value, checked: includes(selectedLicenses, normalize(value)) }
      })
    }
    if (filters.usageTypes) {
      usageTypes = filters.usageTypes.map(({name, value}) => {
        return { name, value, checked: includes(selectedUsageTypes, normalize(value)) }
      })
    }
  }

  const total = get(browseResults, 'total') || 0
  const repos = get(browseResults, 'repos')

  return {
    agencies,
    browseResults,
    languages,
    licenses,
    repos,
    selectedPage,
    selectedPageSize,
    usageTypes,
    total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFilterData: () => dispatch(saveFilterOptions()),
    onFilterBoxChange: (filters) => {
      dispatch(updateBrowseFilters(filters))

      const urlSearchParams = new URLSearchParams(window.location.search)
      Object.keys(filters).forEach(category => {
        const values = filters[category]
        if (values.length === 0) {
          urlSearchParams.delete(category)
        } else {
          urlSearchParams.set(category, values.join(','))
        }
      })

      const newUrl = window.location.pathname + "?" + urlSearchParams.toString()

      dispatch(push(newUrl))
      const apiFilters = {...filters, size: 10}
      dispatch(updateBrowseResults(apiFilters))
    },
    updatePage: newPage => {
      dispatch(updatePage(newPage))
      dispatch(updateBrowseFilters('page', newPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseProjectsComponent)
