import { UPDATE_TASK_PARAMS } from 'constants/actions'
import updateTaskParams from 'actions/update-task-params'

describe('actions - update-task-params', () => {
  it('should return an object containing the `UPDATE_TASK_PARAMS` type', () => {
    expect(updateTaskParams().type).toBe(UPDATE_TASK_PARAMS)
  })

  it('should set the first param as `data`', () => {
    expect(updateTaskParams('test-task').data).toBe('test-task')
  })
})