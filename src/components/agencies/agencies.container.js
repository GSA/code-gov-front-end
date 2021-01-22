import { connect } from 'react-redux'
import { includes } from '@code.gov/cautious'
import get from 'lodash.get'
import { getFilterTags, getFilterValuesFromParamsByCategory, normalize } from 'utils/other'
import saveFilterOptions from 'actions/save-filter-options'
import updateAgenciesFilters from 'actions/update-agencies-filters'
import { sortByBestMatch, sortByDataQuality, sortByDate, sortByName } from 'utils/repo-sorting'
import updateAgenciesParams from 'actions/update-agencies-params'
import AgenciesComponent from './agencies.component'
import Agencies from '../../../config/site/agency_list'

const AgencyList = Agencies.filter(agency => agency.agencyDashboard === true)

export const mapStateToProps = ({ agenciesParams, agenciesResults, filters }) => {
  const categories = ['agencies']

  console.log({ filters, agenciesParams, agenciesResults })
  const selections = categories.reduce((accumulator, key) => {
    accumulator[key] = getFilterValuesFromParamsByCategory(agenciesParams, key)
    return accumulator
  }, {})

  const selectedSorting = agenciesParams.sort
  const selectedPage = agenciesParams.page
  const selectedPageSize = agenciesParams.size

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

  const total = get(agenciesResults, 'total') || 0
  const repos = get(agenciesResults, 'repos')

  if (Array.isArray(repos)) {
    /* eslint-disable array-callback-return */
    repos.sort((a, b) => {
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
  }

  const filterTags = getFilterTags(agenciesParams, filters)

  const result = {
    AgencyList,
    boxes,
    agenciesParams,
    agenciesResults,
    filterTags,
    selectedSorting,
    repos,
    selectedPage,
    selectedPageSize,
    total
  }

  return result
}

export const mapDispatchToProps = dispatch => ({
  onFilterBoxChange: (category, change) => {
    dispatch(updateAgenciesFilters(category, change.value, change.type))
  },
  onFilterTagClick: (category, value) => {
    dispatch(updateAgenciesFilters(category, value, 'remove'))
  },
  onSortChange: value => {
    dispatch(updateAgenciesParams({ page: 1, sort: value }))
  },
  saveFilterData: () => dispatch(saveFilterOptions()),
  updatePage: newPage => {
    dispatch(updateAgenciesParams({ page: newPage }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AgenciesComponent)
