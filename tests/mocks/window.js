export const eventMap = {}

window.addEventListener = (event, callback) => {
    eventMap[event] = callback
}

window.scrollTo = jest.fn()

export const push = (location) => {
  window.history.pushState({}, '', location)
}

window.customElements = {
  get: x => `<custom element: ${x}>`,
}