import { testReducerCommon } from 'testUtils/reducer'
import { SAVE_AGENCIES } from 'constants/actions'
import reducer from 'reducers/agencies'

describe('reducers - agencies', ()=> {
  testReducerCommon(reducer)

  describe('case `SAVE_AGENCIES`', () => {
    it('should set state as the `agencies`', () => {
      const action = { type: SAVE_AGENCIES, agencies: ['ag-1', 'ag-2'] }
      expect(reducer({ agencies: ['ag-3'] }, action)).toEqual(['ag-1', 'ag-2'])
    })
  })
})