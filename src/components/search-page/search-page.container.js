import { connect } from 'react-redux'
import {
  getFilterTags,
  getFilterValuesFromParamsByCategory,
  getLowerSet,
  hasLicense,
  normalize
} from 'utils/other'
import saveFilterOptions from 'actions/save-filter-options'
import updateSearchFilters from 'actions/update-search-filters'
import updateSearchParams from 'actions/update-search-params'
import get from 'lodash.get'
import { includes, len, overlaps, some } from '@code.gov/cautious'
import { sortByBestMatch, sortByDataQuality, sortByDate, sortByName } from 'utils/repo-sorting'
import SearchPageComponent from './search-page.component'

export const mapStateToProps = ({ filters, searchParams, searchResults, selectedSorting }) => {
  try {
    const categories = ['agencies', 'languages', 'licenses', 'usageTypes']

    const selections = categories.reduce((accumulator, key) => {
      accumulator[key] = normalize(getFilterValuesFromParamsByCategory(searchParams, key))
      return accumulator
    }, {})

    let optionsinResults
    if (searchResults && searchResults.repos) {
      const repos = searchResults.repos
      optionsinResults = {
        agencies: getLowerSet(repos, 'agency.acronym'),
        languages: getLowerSet(repos, 'languages'),
        licenses: getLowerSet(repos, 'permissions.licenses[0].name'),
        usageTypes: getLowerSet(repos, 'permissions.usageType')
      }
    }

    const query = searchParams.query
    const selectedPage = searchParams.page
    const selectedPageSize = searchParams.size
    const selectedSorting = searchParams.sort

    let boxes = {}
    if (filters) {
      boxes = categories.reduce((accumulator, key) => {
        accumulator[key] = filters[key]
          .filter(({ name, value }) => {
            if (optionsinResults && optionsinResults[key]) {
              return optionsinResults[key].has(normalize(value))
            }
            return false
          })
          .map(({ name, value }) => ({
            name,
            value,
            checked: includes(selections[key], normalize(value))
          }))
        return accumulator
      }, {})
    }

    let total = 0

    let filteredResults
    if (searchResults) {
      filteredResults = searchResults.repos
        /* eslint-disable array-callback-return */
        .sort((a, b) => {
          if (selectedSorting === 'best_match') {
            return sortByBestMatch(a, b)
          }
          if (selectedSorting === 'data_quality') {
            return sortByDataQuality(a, b)
          }
          if (selectedSorting === 'a-z') {
            return sortByName(a, b)
          }
          if (selectedSorting === 'last_updated') {
            return sortByDate(a, b)
          }
        })
        .filter(repo => {
          if (filters) {
            if (
              some(selections.agencies) &&
              !selections.agencies.includes(normalize(repo.agency.acronym))
            ) {
              return false
            }

            if (
              some(selections.languages) &&
              !overlaps(normalize(repo.languages), selections.languages)
            ) {
              return false
            }

            if (some(selections.licenses)) {
              // no licenses assigned on the repo
              if (hasLicense(repo) === false) {
                return false
              }

              const repoLicenses = repo.permissions.licenses.map(license => normalize(license.name))
              if (!overlaps(repoLicenses, selections.licenses)) {
                return false
              }
            }

            const normalizedRepoUsageType = normalize(repo.permissions.usageType)
            if (
              some(selections.usageTypes) &&
              !selections.usageTypes.includes(normalizedRepoUsageType)
            ) {
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

      filteredResults = filteredResults.slice(
        (selectedPage - 1) * selectedPageSize,
        selectedPage * selectedPageSize
      )
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

    const filterTags = getFilterTags(searchParams, filters)

    const result = {
      boxes,
      filteredResults,
      filterTags,
      filters,
      searchParams,
      selectedPage,
      selectedPageSize,
      searchResults,
      sortOptions,
      query,
      total
    }

    console.log("search-page.container's mapStateToProps function is returning", result)

    return result
  } catch (error) {
    console.error(error)
  }
}

export const mapDispatchToProps = dispatch => ({
  onFilterBoxChange: (category, change) => {
    dispatch(updateSearchFilters(category, change.value, change.type))
  },
  onFilterTagClick: (category, value) => {
    dispatch(updateSearchFilters(category, value, 'removed'))
  },
  onSortChange: value => {
    dispatch(updateSearchParams({ page: 1, sort: value }))
  },
  saveFilterData: () => dispatch(saveFilterOptions()),
  updatePage: newPage => {
    dispatch(updateSearchParams({ page: newPage }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPageComponent)
