import { testReducerCommon } from 'testUtils/reducer'
import { HIDE_MOBILE_MENU, SHOW_MOBILE_MENU, TOGGLE_MOBILE_MENU } from 'constants/actions'
import reducer from 'reducers/mobile-menu'

describe('reducers - mobile-menu', ()=> {
  testReducerCommon(reducer)

  describe('case `HIDE_MOBILE_MENU`', () => {
    it('should set state as falsy', () => {
      const action = { type: HIDE_MOBILE_MENU }
      expect(reducer(true, action)).toBeFalsy()
      expect(reducer(false, action)).toBeFalsy()
    })
  })

  describe('case `SHOW_MOBILE_MENU`', () => {
    it('should set state as truthy', () => {
      const action = { type: SHOW_MOBILE_MENU }
      expect(reducer(false, action)).toBeTruthy()
      expect(reducer(true, action)).toBeTruthy()
    })
  })

  describe('case `TOGGLE_MOBILE_MENU`', () => {
    it('should set state as the opposite of it`s current value', () => {
      const action = { type: TOGGLE_MOBILE_MENU }
      expect(reducer(true, action)).toBeFalsy()
      expect(reducer(false, action)).toBeTruthy()
    })
  })
})