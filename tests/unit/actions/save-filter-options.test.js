import { getJSON } from 'utils/other'
import { SAVE_FILTER_OPTIONS } from 'constants/actions'
import saveFilterOptions from 'actions/save-filter-options'

jest.mock('utils/other')

const options = ['opt-1', 'opt-2']
const dispatch = jest.fn()

describe('actions - save-filter-options', () => {
  beforeEach(() => {
    getJSON.mockImplementation(() => options)
  })

  it('should return a function (thunk)', () => {
    expect(typeof saveFilterOptions()).toBe('function')
  })

  it('should dispatch an object containing the `SAVE_FILTER_OPTIONS` type', async () => {
    await saveFilterOptions()(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: SAVE_FILTER_OPTIONS }))
  })

  it('should return the `options` retrieved', async () => {
    await saveFilterOptions()(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ options }))
  })
})