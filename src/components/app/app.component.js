import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../menu';

const AppComponent = ({ layout, setLayout }) => (
  <div
    className="App"
  >
    <Switch>
      <Route component={Menu} />
    </Switch>
  </div>
);

export default AppComponent;
