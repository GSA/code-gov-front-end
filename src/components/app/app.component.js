import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from 'browser-history'
import FederalAgencies from 'components/federal-agencies'
import Roadmap from 'components/roadmap'
import Home from 'components/home'
import BrowseProjects from 'components/browse-projects'
import OpenTasks from 'components/open-tasks'
import ProjectPage from 'components/project-page'
import SearchPage from 'components/search-page'
import Menu from 'components/menu'
import Footer from 'components/footer'
import AboutCodeDotGov from 'components/about-codedotgov'
import OfficialBanner from 'components/official-banner'
import PrivacyPolicy from 'components/privacy-policy'
import { refreshView, isHomepage } from 'utils/other'

export default class AppComponent extends Component {
  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', _event => {
      this.props.rehydrate()
    })
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <a className="usa-skipnav z-500" href="#main-content">
            Skip to main content
          </a>
          <div className="width-full menu-banner-header">
            {isHomepage ? <OfficialBanner isDark /> : <OfficialBanner />}
            <Menu />
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={SearchPage} />
            <Route path="/federal-agencies" component={FederalAgencies} />
            <Route path="/browse-projects" component={BrowseProjects} />
            <Route path="/open-tasks" component={OpenTasks} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/projects/:repoID" component={ProjectPage} />
            <Route path="/roadmap" component={Roadmap} />
            <Route path="/about-page" component={AboutCodeDotGov} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      </ConnectedRouter>
    )
  }
}
