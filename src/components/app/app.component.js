import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import history from 'browser-history'
import Roadmap from 'components/roadmap'
import Home from 'components/home'
import Menu from 'components/menu'
import Footer from 'components/footer'
import About from 'components/about'
import OfficialBanner from 'components/official-banner'
import PrivacyPolicy from 'components/privacy-policy'
import AgencyCompliance from 'components/agency-compliance'
import Agencies from 'components/agencies'
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
        <a className="usa-skipnav z-500" href="#main-content">
          Skip to main content
        </a>
        <div className="width-full menu-banner-header">
          {isHomepage ? <OfficialBanner isDark /> : <OfficialBanner />}
          <Menu />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/agencies" component={Agencies} />
          <Route path="/agency-compliance" component={AgencyCompliance} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/roadmap" component={Roadmap} />
          <Route path="/about" component={About} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </ConnectedRouter>
    )
  }
}
