/* global URLSearchParams */

import { connect } from 'react-redux';
import { getFilterData, hasLicense, normalize } from 'utils/other'
import saveFilterOptions from 'actions/save-filter-options'
import updateSearchFilters from 'actions/update-search-filters'
import updateSearchSorting from 'actions/update-search-sorting'
import updatePage from 'actions/update-page'
import SearchPageComponent from './search-page.component'
import get from 'lodash.get'
import { push } from 'connected-react-router'
import { clone, includes, len, overlaps, some, sortBy } from '@code.gov/cautious'
import { sortByBestMatch, sortByDataQuality, sortByDate, sortByName } from 'utils/repo-sorting'

const mapStateToProps = ({ filters, siteConfig, searchFilters, searchHistory, searchSorting }) => {

  try {

    const currentSearchResults = searchHistory && searchHistory.length ? searchHistory[0] : null

    const query = get(currentSearchResults, 'filters.query')

    const selectedAgencies = normalize(searchFilters ? searchFilters.agencies : [])
    const selectedLicenses = normalize(searchFilters ? searchFilters.licenses : [])
    const selectedLanguages = normalize(searchFilters ? searchFilters.languages : [])
    const selectedUsageTypes = normalize(searchFilters ? searchFilters.usageTypes : [])
    const selectedPage = get(searchFilters, 'page') || 1
    const selectedPageSize = get(searchFilters, 'pageSize') || 10

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

    let usageTypes = getFilterData('licenses', 'permissions.usageType', currentSearchResults, filters)
    if (usageTypes) {
      usageTypes = usageTypes.map(({name, value}) => {
        return { name, value, checked: includes(selectedLicenses, normalize(value)) }
      })
    }

    let total = 0

    let filteredResults
    if (currentSearchResults) {

      searchSorting = searchSorting || 'Best Match'
      console.log("searchSorting is", searchSorting)

      filteredResults = currentSearchResults.repos
      .sort((a, b) => {
        if (searchSorting === 'Best Match') {
          return sortByBestMatch(a, b)
        } else if (searchSorting === 'Data Quality') {
          return sortByDataQuality(a, b)
        } else if (searchSorting === 'A-Z') {
          return sortByName(a, b)
        } else if (searchSorting === 'Last Updated') {
          return sortByDate(a, b)
        }
      })
      .filter(repo => {
        if (filters) {

          if (some(selectedAgencies) && selectedAgencies.includes(normalize(repo.agency.acronym)) === false) {
            return false
          }

          if (some(selectedLanguages) && overlaps(normalize(repo.languages), selectedLanguages)) {
            return false
          }

          if (some(selectedLicenses)) {

            // no licenses assigned on the repo
            if (hasLicense(repo) === false) {
              return false
            }

            const repoLicenses = repo.permissions.licenses.map(license => normalize(license.name))
            if (overlaps(repoLicenses, selectedLicenses)) {
              return false
            }
          }

          const normalizedRepoUsageType = normalize(repo.permissions.usageType)
          if (some(selectedUsageTypes) && selectedUsageTypes.includes(normalizedRepoUsageType) === false) {
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

      total = len(filteredResults)

      filteredResults = filteredResults.slice((selectedPage-1) * selectedPageSize, selectedPage * selectedPageSize)
    }

    return {
      agencies,
      currentSearchResults,
      filteredResults,
      filters,
      languages,
      licenses,
      searchFilters,
      selectedPage,
      selectedPageSize,
      query,
      total,
      usageTypes
    }
  } catch (error) {
    console.error(error)
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
    onSortChange: value => {
      dispatch(updateSearchSorting(value))
      const newPage = 1
      dispatch(updatePage(newPage))
      dispatch(updateSearchFilters('page', newPage))
    },
    saveFilterData: () => dispatch(saveFilterOptions()),
    updatePage: newPage => {
      dispatch(updatePage(newPage))
      dispatch(updateSearchFilters('page', newPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent)
