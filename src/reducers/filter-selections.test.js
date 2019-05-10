import { testReducerCommon } from 'testUtils/reducer'
import { SAVE_FILTER_SELECTIONS } from 'constants/actions'
import reducer from 'reducers/filter-selections'

describe('reducers - filter-selections', ()=> {
  testReducerCommon(reducer)

  describe('case `SAVE_FILTER_SELECTIONS`', () => {
    it('should set state as the `selections`', () => {
      const action = { type: SAVE_FILTER_SELECTIONS, selections: ['sel-1', 'sel-2'] }
      expect(reducer(['sel-3'], action)).toEqual(['sel-1', 'sel-2'])
    })
  })
})