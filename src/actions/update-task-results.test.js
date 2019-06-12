import pick from 'lodash.pick'

import client from 'api-client'
import { UPDATE_TASK_RESULTS } from 'constants/actions'
import updateTaskResults from 'actions/update-task-results'

const options = {
  size: 123,
  page: 2,
  filters: [
    { category: 'agencies', value: 'ag-1' },
    { category: 'agencies', value: 'ag-2' },
    { category: 'languages', value: 'la-1' }
  ]
}
const results = {
  tasks: [{ taskID: 'task-1' }, { taskID: 'task-2' }]
}
const dispatch = jest.fn()

describe('actions - update-task-results', () => {
  beforeEach(() => {
    client.tasks.mockResolvedValue(results)
  })

  it('should return a function (thunk)', () => {
    expect(typeof updateTaskResults(options)).toBe('function')
  })

  it('should dispatch an object containing the `UPDATE_TASK_RESULTS` type', async () => {
    await updateTaskResults(options)(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: UPDATE_TASK_RESULTS }))
  })

  it('should return the `results` retrieved', async () => {
    await updateTaskResults(options)(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ results }))
  })

  it('should pass the options to the api call for repos', async () => {
    const expected = {
      ...pick(options, ['size', 'page']),
      agencies: ['ag-1', 'ag-2'],
      categories: [],
      languages: ['la-1'],
      skillLevels: [],
      timeRequired: []
    }

    await updateTaskResults(options)(dispatch)
    expect(client.tasks).toBeCalledWith(expected)
  })

  it('should call the api with default options if none provided', async () => {
    await updateTaskResults({})(dispatch)
    expect(client.tasks).toBeCalledWith({})
  })
})
