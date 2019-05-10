import { testReducerCommon } from 'testUtils/reducer'
import { LOAD_PROJECT } from 'constants/actions'
import reducer from 'reducers/project'

describe('reducers - project', ()=> {
  testReducerCommon(reducer)

  describe('case `LOAD_PROJECT`', () => {
    it('should set state as the `data`', () => {
      const action = { type: LOAD_PROJECT, data: ['proj-1', 'proj-2'] }
      expect(reducer(['proj-3'], action)).toEqual(['proj-1', 'proj-2'])
    })
  })
})