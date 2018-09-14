import OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import buildStore from './build-store';
import { Provider } from 'react-redux';
import UrlService from './services/UrlService';
import Map from './Map';
import '../styles/style.less';

OfflinePluginRuntime.install();

const store = buildStore();
window.store = store; // made this global so it can be accessed from anywhere

const url = UrlService.get('url');

// newPathName is usually something like /roadmap
const newPathName = UrlService.get('p');
if (newPathName) {
  // newSearch is usually something like ?p=/browse-projects&agencies=DOD,USDA
  const newSearch = window.location.search
    .replace(/(\?|&)p=[a-z-]{3,100}/, '') // remove p=... param from url
    .replace(/^./, '?'); // mark sure starting search param is a question mark

  // newUrl is usually something like /identify?url=...
  const newUrl = newPathName + newSearch;

  /* global history */
  history.replaceState({}, newUrl, newUrl);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
