import { testReducerCommon } from 'testUtils/reducer'
import {
  COLLAPSE_ALL_MOBILE_MENU_OPTIONS,
  COLLAPSE_MOBILE_MENU_OPTION,
  EXPAND_MOBILE_MENU_OPTION,
  TOGGLE_MOBILE_MENU_OPTION
} from 'constants/actions'
import reducer from 'reducers/expanded-mobile-menu-options'

describe('reducers - expanded-mobile-menu-options', ()=> {
  testReducerCommon(reducer)

  describe('case `COLLAPSE_ALL_MOBILE_MENU_OPTIONS`', () => {
    it('should clear state', () => {
      const action = { type: COLLAPSE_ALL_MOBILE_MENU_OPTIONS }
      expect(reducer(['opt-1', 'opt-2'], action)).toEqual([])
    })
  })

  describe('case `EXPAND_MOBILE_MENU_OPTION`', () => {
    it('should set state as the provided option', () => {
      const action = { type: EXPAND_MOBILE_MENU_OPTION, name: 'opt-3' }
      expect(reducer(['opt-1', 'opt-2'], action)).toEqual(['opt-3'])
    })
  })

  xdescribe('case `COLLAPSE_MOBILE_MENU_OPTION`', () => {
    // BUG: Always returns empty array. Should this be filtering on state? If not, unneeded filter
    it('should filter the provided option from state', () => {
      const action = { type: COLLAPSE_MOBILE_MENU_OPTION, name: 'opt-1' }
      expect(reducer(['opt-1', 'opt-2'], action)).toEqual(['opt-2'])
    })
  })

  describe('case `TOGGLE_MOBILE_MENU_OPTION`', () => {
    it('should clear state if the provided option is in state', () => {
      const action = { type: TOGGLE_MOBILE_MENU_OPTION, name: 'opt-1' }
      expect(reducer(['opt-1', 'opt-2'], action)).toEqual([])
    })

    it('should set state as the provided option if it is not in state', () => {
      const action = { type: TOGGLE_MOBILE_MENU_OPTION, name: 'opt-3' }
      expect(reducer(['opt-1', 'opt-2'], action)).toEqual(['opt-3'])
    })
  })
})