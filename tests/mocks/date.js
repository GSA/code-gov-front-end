export const getTime = Date.prototype.getTime
// use this to restore to original functionality
export const restoreGetTime = () => {
  Date.prototype.getTime = getTime
}
// mock getTime to always return the same time
export const mockGetTime = () => {
  Date.prototype.getTime = () => 1234567890123
}

mockGetTime()