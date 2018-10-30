/* global URLSearchParams */

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { includes, length } from '@code.gov/cautious'
import get from 'lodash.get'
import { getConfigValue, getFilterData, normalize } from 'utils/other'
import { parseLocation } from 'utils/url-parsing'
import saveFilterOptions from 'actions/save-filter-options'
import updateBrowseParams from 'actions/update-browse-params'
import updateBrowseResults from 'actions/update-browse-results'
import updateUrlParam from 'actions/update-url-param'
import BrowseProjectsComponent from './browse-projects.component'

const mapStateToProps = ({ browseParams, browseResults, filters, siteConfig }) => {

  const selectedAgencies = normalize(browseParams ? browseParams.agencies : [])
  const selectedLicenses = normalize(browseParams ? browseParams.licenses : [])
  const selectedLanguages = normalize(browseParams ? browseParams.languages : [])
  const selectedUsageTypes = normalize(browseParams ? browseParams.usageTypes : [])
  const selectedPage = get(browseParams, 'page') || 1
  const selectedPageSize = get(browseParams, 'pageSize') || 10
  const selectedSorting = get(browseParams, 'sort') || 'data_quality'

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

  return {
    agencies,
    browseParams,
    browseResults,
    selectedSorting,
    languages,
    licenses,
    repos,
    selectedPage,
    selectedPageSize,
    sortOptions,
    usageTypes,
    total
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveFilterData: () => dispatch(saveFilterOptions()),
    loadPage: () => {
      const {
        agencies,
        languages,
        licenses,
        page,
      } = parseLocation(this.props.location)

      dispatch(updateBrowseParams('agencies', agencies))
      dispatch(updateBrowseParams('languages', languages))
      dispatch(updateBrowseParams('licenses', licenses))
      dispatch(updateBrowseParams('page', page))
      const apiFilters = { agencies, languages, licenses, page, size: 10}
      //if (selectedSorting) apiFilters.sort = selectedSorting
      console.log("apiFIlters:", apiFilters)
      dispatch(updateBrowseResults(apiFilters))
    },
    onFilterBoxChange: filters => {
      const selectedSorting = get(ownProps, 'browseParams.sort')

      console.log("starting onFilterBoxChange with:", filters)
      dispatch(updateBrowseParams(filters))
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
      if (selectedSorting) apiFilters.sort = selectedSorting
      console.log("apiFIlters:", apiFilters)
      dispatch(updateBrowseResults(apiFilters))
    },
    onSortChange: value => {
      const { browseParams } = ownProps
      dispatch(updateUrlParam('sort', value))
      dispatch(updateBrowseParams('sort', value))

      const newPage = 1
      dispatch(updateUrlParam('page', newPage))
      dispatch(updateBrowseParams('page', newPage))
      const apiFilters = {...browseParams, size: 10, sort: value}

      dispatch(updateBrowseResults(apiFilters))
    },
    updatePage: newPage => {
      dispatch(updateUrlParam('page', newPage))
      dispatch(updateBrowseParams('page', newPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseProjectsComponent)
