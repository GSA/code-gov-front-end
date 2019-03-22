export const eventMap = {}

document.addEventListener = (event, callback) => {
    eventMap[event] = callback
}
