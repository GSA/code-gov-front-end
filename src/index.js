import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/app'
import buildStore from './build-store'
import { Provider } from 'react-redux'
import '../styles/_main.scss'
import syncers from './syncers'
import syncStore from './sync-store'

const store = buildStore()

syncStore(store, syncers)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
