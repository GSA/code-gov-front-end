import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../menu';

import siteConfig from '../../../config/site/site.json';


export default class AppComponent extends React.Component {

  componentDidMount() {
    this.props.saveSiteConfig(siteConfig)
  }

  render() {
    <div className="App">
      <Switch>
      </Switch>
    </div>    
  }
}