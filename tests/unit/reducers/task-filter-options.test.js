import { testReducerCommon } from 'testUtils/reducer'
import { SAVE_TASK_FILTER_OPTIONS } from 'constants/actions'
import reducer from 'reducers/task-filter-options'

describe('reducers - task-filter-options', ()=> {
  testReducerCommon(reducer)

  describe('case `SAVE_TASK_FILTER_OPTIONS`', () => {
    it('should set state as the `options`', () => {
      const action = { type: SAVE_TASK_FILTER_OPTIONS, options: ['task-1', 'task-2'] }
      expect(reducer(['task-3'], action)).toEqual(['task-1', 'task-2'])
    })
  })
})