import { SAVE_FILTER_SELECTIONS } from 'constants/actions'
import updateFilterSelections from 'actions/update-filter-selections'

describe('actions - update-filter-selections', () => {
  it('should return an object containing the `SAVE_FILTER_SELECTIONS` type', () => {
    expect(updateFilterSelections().type).toBe(SAVE_FILTER_SELECTIONS)
  })

  it('should set the first param as `selections`', () => {
    expect(updateFilterSelections(['sel-1', 'sel-2']).selections).toEqual(['sel-1', 'sel-2'])
  })
})