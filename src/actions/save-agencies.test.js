import client from 'api-client'
import { SAVE_AGENCIES } from 'constants/actions'
import saveAgencies from 'actions/save-agencies'

const agencies = ['ag-1', 'ag-2']
const dispatch = jest.fn()

describe('actions - save-agencies', () => {
  beforeEach(() => {
    client.getAgencies.mockResolvedValue(agencies)
  })

  it('should return a function (thunk)', () => {
    expect(typeof saveAgencies()).toBe('function')
  })

  it('should dispatch an object containing the `SAVE_AGENCIES` type', async () => {
    await saveAgencies()(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: SAVE_AGENCIES }))
  })

  it('should return the `agencies` retrieved', async () => {
    await saveAgencies()(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ agencies }))
  })
})
