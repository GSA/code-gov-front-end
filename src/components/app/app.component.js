/* global history */

import React from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from 'browser-history'
import Roadmap from 'components/roadmap'
import Home from 'components/home'
import BrowseProjects from 'components/browse-projects'
import SearchPage from 'components/search-page'
import Menu from 'components/menu'
import Footer from 'components/footer'
import PrivacyPolicy from 'components/privacy-policy'
import { refreshView } from 'utils'


import siteConfig from '../../../config/site/site.json'


export default class AppComponent extends React.Component {

  componentDidMount() {
    this.props.saveSiteConfig(siteConfig)
    /*
    console.log('app component with props', this.props)
    const location = this.props.location
    if (location.pathname.contains('search')) {
      const params = new URLSearchParams(location.search)
    }
    */
    refreshView()
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Menu />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/browse-projects' component={BrowseProjects}/>
            <Route path='/privacy-policy' component={PrivacyPolicy}/>
            <Route path='/roadmap' component={Roadmap}/>
            <Route path='/search' component={SearchPage}/>
            <Redirect to='/' />
          </Switch>
          <Footer />
        </div>
      </ConnectedRouter>
    )
  }
}
