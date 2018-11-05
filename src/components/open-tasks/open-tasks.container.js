/* global URLSearchParams */
import { connect } from 'react-redux'
import { getConfigValue, getFilterData, normalize } from 'utils/other'
import OpenTasksComponent from './open-tasks.component'
import updateTaskParams from 'actions/update-task-params'
import saveTaskFilterOptions from 'actions/save-task-filter-options'
import updateTaskResults from 'actions/update-task-results'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { push } from 'connected-react-router'
import { excludes, filter, has, includes, overlaps, some } from '@code.gov/cautious'

const mapStateToProps = ({ taskFilterOptions, taskParams, taskResults }) => {

 try {

  console.log("taskFilterOptions:", taskFilterOptions)

  const selections = {
    agencies: normalize(taskParams ? taskParams.agencies : []),
    categories: normalize(taskParams ? taskParams.categories : []),
    languages: normalize(taskParams ? taskParams.languages : []),
    skillLevels: normalize(taskParams ? taskParams.skillLevels : []),
    timeRequired: normalize(taskParams ? taskParams.timeRequired : []),
    page: get(taskParams, 'page') || 1,
    pageSize: get(taskParams, 'pageSize') || 10
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

  const tasks = get(taskResults, 'tasks')

  const total = get(taskResults, 'total')

  return { boxes: filterBoxItems, selections, tasks, total }
 } catch (error) {
  console.error(error)
 }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilterBoxChange: (category, values) => {
      dispatch(updateTaskParams({ [category]: values }))
    },
    saveFilterData: () => dispatch(saveTaskFilterOptions()),
    updatePage: newPage => {
      dispatch(updateTaskParams({ page: newPage }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTasksComponent)
