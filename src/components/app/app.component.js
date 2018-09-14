import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../menu';

import site from '../../../config/site/site.json';

console.log("site:", site);

const AppComponent = ({ layout, setLayout }) => (
  <div
    className="App"
  >
    <Switch>
    </Switch>
  </div>
);

export default AppComponent;
