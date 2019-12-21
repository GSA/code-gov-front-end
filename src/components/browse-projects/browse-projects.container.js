import { connect } from 'react-redux'
import { getFilterTags, getFilterValuesFromParamsByCategory, normalize } from 'utils/other'
import saveFilterOptions from 'actions/save-filter-options'
import updateBrowseFilters from 'actions/update-browse-filters'
import updateBrowseParams from 'actions/update-browse-params'
import { includes, overlaps, some } from '@code.gov/cautious'
import get from 'lodash.get'
import { sortByDataQuality, sortByDate, sortByName } from 'utils/repo-sorting'
import BrowseProjectsComponent from './browse-projects.component'

export const mapStateToProps = ({ filters, browseParams, browseResults }) => {
  const categories = ['agencies', 'languages', 'licenses', 'usageTypes']

  const selections = categories.reduce((accumulator, key) => {
    accumulator[key] = getFilterValuesFromParamsByCategory(browseParams, key)
    return accumulator
  }, {})
  // console.log("selections:", selections)

  const selectedSorting = browseParams.sort
  const selectedPage = browseParams.page
  const selectedPageSize = browseParams.size

  let boxes = {}
  if (filters) {
    boxes = categories.reduce((accumulator, key) => {
      accumulator[key] = filters[key].map(({ name, value }) => ({
        name,
        value,
        checked: includes(selections[key], normalize(value))
      }))
      return accumulator
    }, {})
  }

  const total = get(browseResults, 'total') || 0
  const repos = get(browseResults, 'repos')

  /* eslint-disable array-callback-return */
  repos
    .sort((a, b) => {
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

  const sortOptions = [
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

  const filterTags = getFilterTags(browseParams, filters)

  const result = {
    boxes,
    browseParams,
    browseResults,
    filterTags,
    selectedSorting,
    repos,
    selectedPage,
    selectedPageSize,
    sortOptions,
    total
  }

  // console.log("browse-projects's container passing following to component:", result)
  return result
}

export const mapDispatchToProps = dispatch => ({
  onFilterBoxChange: (category, change) => {
    dispatch(updateBrowseFilters(category, change.value, change.type))
  },
  onFilterTagClick: (category, value) => {
    dispatch(updateBrowseFilters(category, value, 'remove'))
  },
  onSortChange: value => {
    dispatch(updateBrowseParams({ page: 1, sort: value }))
  },
  saveFilterData: () => dispatch(saveFilterOptions()),
  updatePage: newPage => {
    dispatch(updateBrowseParams({ page: newPage }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseProjectsComponent)
