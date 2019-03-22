import defaultState from 'constants/default-redux-store-state'
import reducer from 'reducers/root'

describe('reducers - root', ()=> {
  xit('should return a reducer', () => {
    // BUG: default state does not include all properties. It should include all
    // properties that will get populated to avoid confusion and potential side effects
    expect(reducer(defaultState, { type: 'unknown-type' })).toEqual(defaultState)
  })
})