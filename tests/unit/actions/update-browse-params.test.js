import { UPDATE_BROWSE_PARAMS } from 'constants/actions'
import updateBrowseParams from 'actions/update-browse-params'

describe('actions - update-browse-params', () => {
  it('should return an object containing the `UPDATE_BROWSE_PARAMS` type', () => {
    expect(updateBrowseParams().type).toBe(UPDATE_BROWSE_PARAMS)
  })
})