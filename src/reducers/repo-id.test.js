import { testReducerCommon } from 'testUtils/reducer'
import { UPDATE_REPO_ID } from 'constants/actions'
import reducer from 'reducers/repo-id'

describe('reducers - repo-id', ()=> {
  testReducerCommon(reducer)

  describe('case `UPDATE_REPO_ID`', () => {
    it('should set state as the `repoID`', () => {
      const action = { type: UPDATE_REPO_ID, repoID: 123 }
      expect(reducer(456, action)).toEqual(123)
    })
  })
})