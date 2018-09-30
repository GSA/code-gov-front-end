import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from 'browser-history'
import rootReducer from './reducers/root';
import thunk from 'redux-thunk';

const initialState = {}

const buildStore = () => {
  const composeTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    composeTool(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}

export default buildStore;