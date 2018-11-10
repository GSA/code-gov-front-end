/* global URLSearchParams */
import { connect } from 'react-redux'
import {
  getConfigValue,
  getFilterData,
  getFilterValuesFromParamsByCategory,
  getFilterTags,
  normalize
} from 'utils/other'
import OpenTasksComponent from './open-tasks.component'
import updateTaskFilters from 'actions/update-task-filters'
import updateTaskParams from 'actions/update-task-params'
import saveTaskFilterOptions from 'actions/save-task-filter-options'
import updateTaskResults from 'actions/update-task-results'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { push } from 'connected-react-router'
import { excludes, filter, has, includes, overlaps, some } from '@code.gov/cautious'

const mapStateToProps = ({ taskFilterOptions, taskParams, taskResults }) => {

 try {

  const categories = ['agencies', 'categories', 'languages', 'skillLevels', 'timeRequired']

  const selections = categories.reduce((accumulator, key) => {
    accumulator[key] = getFilterValuesFromParamsByCategory(taskParams, key)
    return accumulator
  }, {})
  console.log("selections:", selections)

  const selectedPage = taskParams.page
  const selectedPageSize = taskParams.size

  console.log("taskFilterOptions:", taskFilterOptions)

  console.log("selections:", selections)

  let boxes = {}
  if (taskFilterOptions) {
    boxes = categories.reduce((accumulator, key) => {
      accumulator[key] = taskFilterOptions[key].map(({ name, value}) => {
        return { name, value, checked: includes(selections[key], normalize(value)) }
      })
      return accumulator
    }, {})
  }
  console.log("boxes:", boxes)

  const total = get(taskResults, 'total') || 0
  const tasks = get(taskResults, 'tasks')

  const filterTags = getFilterTags(taskParams, taskFilterOptions)

  const result = {
    boxes,
    selections,
    filterTags,
    selectedPage,
    selectedPageSize,
    tasks,
    total
  }
  console.log("open-tasks.container passing to component:", result)
  return result
 } catch (error) {
  console.error(error)
 }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilterBoxChange: (category, change) => {
      dispatch(updateTaskFilters(category, change.value, change.type))
    },
    onFilterTagClick: (category, value) => {
      dispatch(updateTaskFilters(category, value, 'removed'))
    },
    saveFilterData: () => dispatch(saveTaskFilterOptions()),
    updatePage: newPage => {
      dispatch(updateTaskParams({ page: newPage }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTasksComponent)
