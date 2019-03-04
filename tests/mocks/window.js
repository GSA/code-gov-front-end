export const eventMap = {};

window.addEventListener = (event, callback) => {
    eventMap[event] = callback;
};

window.scrollTo = jest.fn();
