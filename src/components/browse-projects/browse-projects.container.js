/* global URLSearchParams */

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { includes } from '@code.gov/cautious'
import { getConfigValue, getFilterData, normalize } from 'utils'
import saveFilterOptions from 'actions/save-filter-options'
import updateBrowseFilters from 'actions/update-browse-filters'
import updateBrowseResults from 'actions/update-browse-results'
import BrowseProjectsComponent from './browse-projects.component'

const mapStateToProps = ({ browseFilters, browseResults, filters, siteConfig }) => {

  const backgroundImage = getConfigValue(siteConfig, 'images.background')

  const selectedAgencies = normalize(browseFilters ? browseFilters.agencies : [])
  const selectedLicenses = normalize(browseFilters ? browseFilters.licenses : [])
  const selectedLanguages = normalize(browseFilters ? browseFilters.languages : [])
  const selectedUsageTypes = normalize(browseFilters ? browseFilters.usageTypes : [])

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

  return {
    agencies,
    backgroundImage,
    browseResults,
    languages,
    licenses,
    usageTypes
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseProjectsComponent)
