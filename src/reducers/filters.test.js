import { testReducerCommon } from 'testUtils/reducer'
import { SAVE_FILTER_OPTIONS } from 'constants/actions'
import reducer from 'reducers/filters'

describe('reducers - filters', ()=> {
  testReducerCommon(reducer)

  describe('case `SAVE_FILTER_OPTIONS`', () => {
    it('should set state as the `options`', () => {
      const action = { type: SAVE_FILTER_OPTIONS, options: ['opt-1', 'opt-2'] }
      expect(reducer(['opt-3'], action)).toEqual(['opt-1', 'opt-2'])
    })
  })
})