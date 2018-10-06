/* global URLSearchParams */

import { connect } from 'react-redux';
import { getConfigValue, getFilterData, getSearchParams, hasLicense, includes, normalize } from 'utils'
import saveFilterOptions from 'actions/save-filter-options'
import updateSearchFilters from 'actions/update-search-filters'
import SearchPageComponent from './search-page.component'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { push } from 'connected-react-router'

const mapStateToProps = ({ filters, siteConfig, searchFilters, searchHistory }) => {

  const backgroundImage = getConfigValue(siteConfig, 'images.background')

  const currentSearchResults = searchHistory && searchHistory.length ? searchHistory[0] : null

  const query = get(currentSearchResults, 'filters.query')

  const selectedAgencies = normalize(searchFilters ? searchFilters.agencies : [])
  const selectedLicenses = normalize(searchFilters ? searchFilters.licenses : [])
  const selectedLanguages = normalize(searchFilters ? searchFilters.languages : [])
  const selectedUsageTypes = normalize(searchFilters ? searchFilters.usageTypes : [])

  let agencies = getFilterData('agencies', 'agency.acronym', currentSearchResults, filters)
  if (agencies) {
    agencies = agencies.map(({name, value}) => {
      return { name, value, checked: includes(selectedAgencies, normalize(value)) }
    })
  }
  let languages = getFilterData('languages', 'languages', currentSearchResults, filters)
  if (languages) {
    languages = languages.map(({name, value}) => {
      return { name, value, checked: includes(selectedLanguages, normalize(value)) }
    })
  }

  let licenses = getFilterData('licenses', 'permissions.licenses[0].name', currentSearchResults, filters)
  if (licenses) {
    licenses = licenses.map(({name, value}) => {
      return { name, value, checked: includes(selectedLicenses, normalize(value)) }
    })
  }

  let filteredResults
  if (currentSearchResults) {
    filteredResults = currentSearchResults.repos.filter(repo => {
      if (filters) {

        if (Array.isArray(selectedAgencies) && selectedAgencies.length > 0 && selectedAgencies.includes(normalize(repo.agency.acronym)) === false) {
          return false
        }

        if (Array.isArray(selectedLanguages) && selectedLanguages.length > 0 && intersection(normalize(repo.languages), selectedLanguages).length === 0) {
          return false
        }

        if (Array.isArray(selectedLicenses) && selectedLicenses.length > 0) {

          // no licenses assigned on the repo
          if (hasLicense(repo) === false) {
            return false
          }

          const repoLicenses = repo.permissions.licenses.map(license => normalize(license.name))
          if (intersection(repoLicenses, selectedLicenses).length === 0) {
            return false
          }
        }

        const normalizedRepoUsageType = normalize(repo.permissions.usageType)
        if (Array.isArray(selectedUsageTypes) && selectedUsageTypes.length > 0 && selectedUsageTypes.includes(normalizedRepoUsageType) === false) {
          return false
        }

        // don't want to visualize exempt repos
        if (normalizedRepoUsageType.includes('exempt')) {
          return false
        }

        return true
      }

      return false
    })
  }

  return {
    agencies,
    backgroundImage,
    currentSearchResults,
    filteredResults,
    filters,
    languages,
    licenses,
    searchFilters,
    query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilterBoxChange: (category, event) => {
      // we want to make sure we get the event for the filter-box and not its subcomponents
      if (event.target.tagName.toLowerCase() === 'filter-box') {
        const values = event.target.values
        dispatch(updateSearchFilters(category, values))

        const urlSearchParams = new URLSearchParams(window.location.search)
        if (values.length === 0) {
          urlSearchParams.delete(category)
        } else {
          urlSearchParams.set(category, values.join(','))
        }

        const newUrl = window.location.pathname + "?" + urlSearchParams.toString()

        dispatch(push(newUrl))
      }
    },
    saveFilterData: () => dispatch(saveFilterOptions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent)
