export const hasTypeAsync = (action) => {
  it('should dispatch an object containing a `type`', async () => {
    const dispatch = jest.fn()
    const { type } = await action(dispatch)
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type }))
  })
}
