import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import App from 'components/app'
import buildStore from 'build-store'
import history from 'browser-history'
import { Provider } from 'react-redux'
import syncers from 'syncers'
import syncStore from 'sync-store'
import '../styles/_main.scss'

const store = buildStore()

syncStore(store, syncers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
