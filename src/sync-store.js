// modified from https://github.com/reduxjs/redux/issues/303#issuecomment-125184409
function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    let storeState = store.getState()
    let nextState = JSON.stringify(select(storeState));
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(storeState, store.dispatch);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

export default function syncStore(store, syncers) {
  console.log("starting syncStore with", store, syncers)
  syncers.forEach(({ select, sync }) => {
    observeStore(store, select, sync)
  })
}