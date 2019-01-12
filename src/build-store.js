import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from 'browser-history'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root'
import { hydrate } from './hydrator'

const initialState = hydrate()

const buildStore = () => {
  const composeTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    composeTool(applyMiddleware(routerMiddleware(history), thunk))
  )
}

export default buildStore
