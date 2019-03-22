// mock logging, use console.info or some other non mocked for logging in tests
console.log = jest.fn()
console.warn = jest.fn()
console.error = jest.fn()