/* global URLSearchParams */
import { connect } from 'react-redux'
import { getConfigValue, getFilterData, normalize } from 'utils/other'
import OpenTasksComponent from './open-tasks.component'
import updateTaskFilters from 'actions/update-task-filters'
import updateUrlParam from 'actions/update-url-param'
import saveTaskFilterOptions from 'actions/save-task-filter-options'
import updateTaskResults from 'actions/update-task-results'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { push } from 'connected-react-router'
import { excludes, filter, has, includes, overlaps, some } from '@code.gov/cautious'

const mapStateToProps = ({ taskFilterOptions, taskFilters, taskResults }) => {

 try {

  console.log("taskFilterOptions:", taskFilterOptions)

  taskResults = taskResults || {}

  const selections = {
    agencies: normalize(taskFilters ? taskFilters.agencies : []),
    categories: normalize(taskFilters ? taskFilters.categories : []),
    languages: normalize(taskFilters ? taskFilters.languages : []),
    skillLevels: normalize(taskFilters ? taskFilters.skillLevels : []),
    timeRequired: normalize(taskFilters ? taskFilters.timeRequired : []),
    page: get(taskFilters, 'page') || 1,
    pageSize: get(taskFilters, 'pageSize') || 10
  }

  console.log("selections:", selections)

  const keys = ['agencies', 'skillLevels', 'languages', 'categories', 'timeRequired']

  const filterBoxItems = {}
  keys.forEach(key => {
    if (has(taskFilterOptions, key)) {
      filterBoxItems[key] = taskFilterOptions[key].map(({ name, value }) => {
        return { name, value, checked: includes(selections[key], normalize(value)) }
      })
    }
  })

  console.log("tasks:", tasks)

  const tasks = taskResults.tasks

  const total = taskResults.total

  return { boxes: filterBoxItems, selections, tasks, total }
 } catch (error) {
  console.error(error)
 }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilterBoxChange: (category, values) => {
      dispatch(updateTaskFilters(category, values))
      dispatch(updateUrlParam(category, values))
    },
    saveFilterData: () => dispatch(saveTaskFilterOptions()),
    updatePage: newPage => {
      dispatch(updateUrlParam('page', newPage))
      dispatch(updateTaskFilters('page', newPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTasksComponent)
