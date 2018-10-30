/* global URLSearchParams */

import { connect } from 'react-redux';
import { getFilterData, hasLicense, normalize } from 'utils/other'
import saveFilterOptions from 'actions/save-filter-options'
import updateSearchParams from 'actions/update-search-params'
import updateUrlParam from 'actions/update-url-param'
import SearchPageComponent from './search-page.component'
import get from 'lodash.get'
import { push } from 'connected-react-router'
import { includes, len, overlaps, some, sortBy } from '@code.gov/cautious'
import { sortByBestMatch, sortByDataQuality, sortByDate, sortByName } from 'utils/repo-sorting'

const mapStateToProps = ({ filters, searchParams, searchResults, selectedSorting }) => {

  try {

    const query = get(searchResults, 'filters.query')

    const selectedAgencies = searchParams ? normalize(searchParams.agencies) : []
    const selectedLicenses = searchParams ? normalize(searchParams.licenses) : []
    const selectedLanguages = searchParams ? normalize(searchParams.languages) : []
    const selectedUsageTypes = normalize(searchParams ? searchParams.usageTypes : [])
    const selectedPage = get(searchParams, 'page') || 1
    const selectedPageSize = get(searchParams, 'pageSize') || 10
    const selectedSorting = get(searchParams, 'sort') || 'best_match'

    let agencies = getFilterData('agencies', 'agency.acronym', searchResults, filters)
    if (agencies) {
      agencies = agencies.map(({name, value}) => {
        return { name, value, checked: includes(selectedAgencies, normalize(value)) }
      })
    }
    let languages = getFilterData('languages', 'languages', searchResults, filters)
    if (languages) {
      languages = languages.map(({name, value}) => {
        return { name, value, checked: includes(selectedLanguages, normalize(value)) }
      })
    }

    let licenses = getFilterData('licenses', 'permissions.licenses[0].name', searchResults, filters)
    if (licenses) {
      licenses = licenses.map(({name, value}) => {
        return { name, value, checked: includes(selectedLicenses, normalize(value)) }
      })
    }

    let usageTypes = getFilterData('licenses', 'permissions.usageType', searchResults, filters)
    if (usageTypes) {
      usageTypes = usageTypes.map(({name, value}) => {
        return { name, value, checked: includes(selectedLicenses, normalize(value)) }
      })
    }

    let total = 0

    let filteredResults
    if (searchResults) {

      filteredResults = searchResults.repos
      .sort((a, b) => {
        if (selectedSorting === 'best_match') {
          return sortByBestMatch(a, b)
        } else if (selectedSorting === 'data_quality') {
          return sortByDataQuality(a, b)
        } else if (selectedSorting === 'a-z') {
          return sortByName(a, b)
        } else if (selectedSorting === 'last_updated') {
          return sortByDate(a, b)
        }
      })
      .filter(repo => {
        if (filters) {

          if (some(selectedAgencies) && !selectedAgencies.includes(normalize(repo.agency.acronym))) {
            return false
          }

          if (some(selectedLanguages) && !overlaps(normalize(repo.languages), selectedLanguages)) {
            return false
          }

          if (some(selectedLicenses)) {

            // no licenses assigned on the repo
            if (hasLicense(repo) === false) {
              return false
            }

            const repoLicenses = repo.permissions.licenses.map(license => normalize(license.name))
            if (!overlaps(repoLicenses, selectedLicenses)) {
              return false
            }
          }

          const normalizedRepoUsageType = normalize(repo.permissions.usageType)
          if (some(selectedUsageTypes) && !selectedUsageTypes.includes(normalizedRepoUsageType)) {
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
        selected: selectedSorting === 'best_match'
      },
      {
        label: 'Data Quality',
        value: 'data_quality',
        selected: selectedSorting === 'data_quality'
      },
      {
        label: 'A-Z',
        value: 'a-z',
        selected: selectedSorting === 'a-z'
      },
      {
        label: 'Last Updated',
        value: 'last_updated',
        selected: selectedSorting === 'last_updated'
      }
    ]

    return {
      agencies,
      filteredResults,
      filters,
      languages,
      licenses,
      searchParams,
      selectedPage,
      selectedPageSize,
      searchResults,
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
      dispatch(updateSearchParams(category, values))

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
      const newPage = 1
      dispatch(updateUrlParam('page', newPage))
      dispatch(updateSearchParams('page', newPage))

      dispatch(updateSearchParams('sort', value))
      dispatch(updateUrlParam('sort', value))
    },
    saveFilterData: () => dispatch(saveFilterOptions()),
    updatePage: newPage => {
      dispatch(updateUrlParam('page', newPage))
      dispatch(updateSearchParams('page', newPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent)
