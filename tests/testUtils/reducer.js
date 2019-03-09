export const isFunction = (reducer, params) => {
  it('should return a function', () => {
    expect(typeof reducer(params)).toBe('function');
  });
};

export const hasDefaultState = (reducer, params) => {
  it('should provide a default state value', () => {
    expect(reducer(params)(undefined, { type: '' })).not.toBeUndefined();
  });
};

export const hasDefaultCase = (reducer, params) => {
  it('should return state as is by default', () => {
    expect(reducer(params)({ a: { b: 'c' } }, { type: 'unknown-type' })).toEqual({ a: { b: 'c' } });
  });
};

// tests common reducer functionality
export const testReducerCommon = (reducer, params) => {
  isFunction(reducer, params);
  hasDefaultState(reducer, params);
  hasDefaultCase(reducer, params);
};