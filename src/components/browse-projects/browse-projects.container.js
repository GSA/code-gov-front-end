/* global URLSearchParams */

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { includes, length, map } from '@code.gov/cautious'
import get from 'lodash.get'
import {
  getConfigValue,
  getFilterData,
  getFilterValuesFromParamsByCategory,
  normalize
} from 'utils/other'
import saveFilterOptions from 'actions/save-filter-options'
import updateBrowseFilters from 'actions/update-browse-filters'
import updateBrowseParams from 'actions/update-browse-params'
import BrowseProjectsComponent from './browse-projects.component'
import paramDefaults from 'constants/param-defaults'
import paramTypes from 'constants/param-types'

const mapStateToProps = ({ browseParams, browseResults, filters }) => {

  const categories = ['agencies', 'languages', 'licenses', 'usageTypes']

  const selections = categories.reduce((accumulator, key) => {
    accumulator[key] = getFilterValuesFromParamsByCategory(browseParams, key)
    return accumulator
  }, {})
  console.log("selections:", selections)

  const selectedSorting = browseParams.sort
  const selectedPage = browseParams.page
  const selectedPageSize = browseParams.size

  let boxes = {}
  if (filters) {
    boxes = categories.reduce((accumulator, key) => {
      accumulator[key] = filters[key].map(({ name, value}) => {
        return { name, value, checked: includes(selections[key], normalize(value)) }
      })
      return accumulator
    }, {})
  }
  console.log("boxes:", boxes)

  const total = get(browseResults, 'total') || 0
  const repos = get(browseResults, 'repos')

  const sortOptions = [
    {
      label: 'Data Quality',
      value: 'data_quality',
      selected: selectedSorting=== 'data_quality'
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
    boxes,
    browseParams,
    browseResults,
    selectedSorting,
    repos,
    selectedPage,
    selectedPageSize,
    sortOptions,
    total
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveFilterData: () => dispatch(saveFilterOptions()),
    onFilterBoxChange: (category, change) => {
      dispatch(updateBrowseFilters(category, change.value, change.type))
    },
    onSortChange: value => {
      dispatch(updateBrowseParams({
        page: 1,
        sort: value
      }))
    },
    updatePage: newPage => {
      dispatch(updateBrowseParams({ page: newPage }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseProjectsComponent)
