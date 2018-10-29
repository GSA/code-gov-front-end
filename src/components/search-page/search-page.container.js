/* global URLSearchParams */

import { connect } from 'react-redux';
import { getFilterData, hasLicense, normalize } from 'utils/other'
import saveFilterOptions from 'actions/save-filter-options'
import updateSearchFilters from 'actions/update-search-filters'
import updateSearchSorting from 'actions/update-search-sorting'
import updateUrlParam from 'actions/update-url-param'
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

    searchSorting = searchSorting || 'best_match'
    console.log("searchSorting is", searchSorting)

    let filteredResults
    if (currentSearchResults) {

      filteredResults = currentSearchResults.repos
      .sort((a, b) => {
        if (searchSorting === 'best_match') {
          return sortByBestMatch(a, b)
        } else if (searchSorting === 'data_quality') {
          return sortByDataQuality(a, b)
        } else if (searchSorting === 'a-z') {
          return sortByName(a, b)
        } else if (searchSorting === 'last_updated') {
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


    const sortOptions = [
      {
        label: 'Best Match',
        value: 'best_match',
        selected: searchSorting === 'best_match'
      },
      {
        label: 'Data Quality',
        value: 'data_quality',
        selected: searchSorting === 'data_quality'
      },
      {
        label: 'A-Z',
        value: 'a-z',
        selected: searchSorting === 'a-z'
      },
      {
        label: 'Last Updated',
        value: 'last_updated',
        selected: searchSorting === 'last_updated'
      }
    ]

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
      sortOptions,
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
    onFilterBoxChange: (category, values) => {
      dispatch(updateSearchFilters(category, values))

      const urlSearchParams = new URLSearchParams(window.location.search)
      if (values.length === 0) {
        urlSearchParams.delete(category)
      } else {
        urlSearchParams.set(category, values.join(','))
      }

      const newUrl = window.location.pathname + "?" + urlSearchParams.toString()

      dispatch(push(newUrl))
    },
    onSortChange: value => {
      dispatch(updateSearchSorting(value))
      const newPage = 1
      dispatch(updateUrlParam('page', newPage))
      dispatch(updateUrlParam('sort', value))
      dispatch(updateSearchFilters('page', newPage))
    },
    saveFilterData: () => dispatch(saveFilterOptions()),
    updatePage: newPage => {
      dispatch(updateUrlParam('page', newPage))
      dispatch(updateSearchFilters('page', newPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent)
