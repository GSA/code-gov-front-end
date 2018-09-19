import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../home'
import Menu from '../menu'
import Footer from '../footer'

import siteConfig from '../../../config/site/site.json'


export default class AppComponent extends React.Component {

  componentDidMount() {
    this.props.saveSiteConfig(siteConfig)
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Home />
        </Switch>
        <Footer />
      </div>
    )
  }
}
