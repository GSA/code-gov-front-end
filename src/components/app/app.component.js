import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Roadmap from '../roadmap'
import Home from '../home'
import Menu from '../menu'
import Footer from '../footer'
import PrivacyPolicy from '../privacy-policy'

import siteConfig from '../../../config/site/site.json'


export default class AppComponent extends React.Component {

  componentDidMount() {
    this.props.saveSiteConfig(siteConfig)
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/privacy-policy' component={PrivacyPolicy}/>
          <Route path='/roadmap' component={Roadmap}/>
          <Route component={Home}/>
        </Switch>
        <Footer />
      </div>
    )
  }
}
