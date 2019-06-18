/*
  This file allows you to add syncers (a.k.a. triggers) for your Redux store.
  Syncers is actually an anti-pattern and should be generally discouraged.
  However, several factors made the creation of syncers an unfortunate necessity.
  We look forward to eventually removing this some day.

  This was created to satisfy the need for caching/storing our API results
  as well as organizing how the app updates the interface in response to user
  selections.

  syncStore takes in the store and an array of syncer objects.
  Each syncer object has a select and sync property.

  The value of select is a function that takes in a state of the store and
  returns a value that should be watched.
  When the value from select changes, it triggers the sync function.

  The sync function is basically the function that is run when you make a change
  that you are listening for in the Redux store. It takes
  in the current state of the Redux store and a dispatch function which can
  be used to dispatch actions.

  modified from https://github.com/reduxjs/redux/issues/303#issuecomment-125184409
*/

function observeStore(store, select, onChange) {
  let currentState

  function handleChange() {
    const storeState = store.getState()
    const nextState = JSON.stringify(select(storeState))
    if (nextState !== currentState) {
      currentState = nextState
      onChange(storeState, store.dispatch)
    }
  }

  const unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}

export default function syncStore(store, syncers) {
  console.log('starting syncStore with', store, syncers)
  syncers.forEach(({ select, sync }) => {
    observeStore(store, select, sync)
  })
}
