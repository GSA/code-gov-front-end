/* global history */
/* global URLSearchParams */

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
import { refreshView, normalize } from 'utils'


import siteConfig from '../../../config/site/site.json'


export default class AppComponent extends React.Component {

  loadParamsFromURL() {
    const location = this.props.location
    if (location.pathname.includes('search')) {
      const params = new URLSearchParams(location.search)
      const query = params.get("query")
      if (query) {
        this.props.loadInitialSearch(query)
      }
      const languages = params.get("languages")
      if (languages) {
        this.props.updateSearchFilters('languages', normalize(languages.split(',')))
      }
      const agencies = params.get("agencies")
      if (agencies) {
        this.props.updateSearchFilters('agencies', normalize(agencies.split(',')))
      }
      const licenses = params.get("licenses")
      if (licenses) {
        this.props.updateSearchFilters('licenses', normalize(licenses.split(',')))
      }
    }
  }

  componentDidMount() {
    refreshView()
    this.props.saveSiteConfig(siteConfig)
    this.loadParamsFromURL()
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
