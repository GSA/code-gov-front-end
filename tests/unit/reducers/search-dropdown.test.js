import { testReducerCommon } from 'testUtils/reducer'
import { HIDE_SEARCH_DROPDOWN, SHOW_SEARCH_DROPDOWN, TOGGLE_SEARCH_DROPDOWN } from 'constants/actions'
import reducer from 'reducers/search-dropdown'

describe('reducers - search-dropdown', ()=> {
  testReducerCommon(reducer)

  describe('case `HIDE_SEARCH_DROPDOWN`', () => {
    it('should set state as falsy', () => {
      const action = { type: HIDE_SEARCH_DROPDOWN }
      expect(reducer(true, action)).toBeFalsy()
      expect(reducer(false, action)).toBeFalsy()
    })
  })

  describe('case `SHOW_SEARCH_DROPDOWN`', () => {
    it('should set state as truthy', () => {
      const action = { type: SHOW_SEARCH_DROPDOWN }
      expect(reducer(false, action)).toBeTruthy()
      expect(reducer(true, action)).toBeTruthy()
    })
  })

  describe('case `TOGGLE_SEARCH_DROPDOWN`', () => {
    it('should set state as the opposite of it`s current value', () => {
      const action = { type: TOGGLE_SEARCH_DROPDOWN }
      expect(reducer(true, action)).toBeFalsy()
      expect(reducer(false, action)).toBeTruthy()
    })
  })
})