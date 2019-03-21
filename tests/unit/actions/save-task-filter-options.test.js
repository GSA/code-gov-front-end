import { getJSON } from 'utils/other'
import { SAVE_TASK_FILTER_OPTIONS } from 'constants/actions'
import saveTaskFilterOptions from 'actions/save-task-filter-options'

jest.mock('utils/other')

const options = ['opt-1', 'opt-2']
const dispatch = jest.fn()

describe('actions - save-task-filter-options', () => {
  beforeEach(() => {
    getJSON.mockImplementation(() => options)
  })

  it('should return a function (thunk)', () => {
    expect(typeof saveTaskFilterOptions()).toBe('function')
  })

  it('should dispatch an object containing the `SAVE_TASK_FILTER_OPTIONS` type', async () => {
    await saveTaskFilterOptions()(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: SAVE_TASK_FILTER_OPTIONS }))
  })

  it('should return the `options` retrieved', async () => {
    await saveTaskFilterOptions()(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ options }))
  })
})