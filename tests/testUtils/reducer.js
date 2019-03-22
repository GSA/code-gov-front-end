export const hasDefaultState = (reducer) => {
  it('should provide a default state value', () => {
    expect(reducer(undefined, { type: '' })).not.toBeUndefined()
  })
}

export const hasDefaultCase = (reducer) => {
  it('should return state as is by default', () => {
    expect(reducer({ a: { b: 'c' } }, { type: 'unknown-type' })).toEqual({ a: { b: 'c' } })
  })
}

// tests common reducer functionality
export const testReducerCommon = (reducer) => {
  hasDefaultState(reducer)
  hasDefaultCase(reducer)
}