/* global PUBLIC_PATH */
/* global customElements */
/* global fetch */
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Breadcrumbs from 'components/breadcrumbs'
import NavSelect from 'components/nav-select'
import SiteBanner from 'components/site-banner'
import SideNav from 'components/side-nav'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import ComplianceDashboard from './compliance-dashboard.container'
import InventoryCode from './inventory-code'
import JSONValidator from './json-validator.component'
import OverviewIntroduction from './overview-introduction.component'
import OverviewTrackingProgress from './overview-tracking-progress.component'
import Procurement from './procurement.component.js'
import OpenSourceIntroduction from './open-source-introduction.component'
import Resources from './resources.component'
import MeasuringCode from './measuring-code.component'
import Licensing from './licensing.component'

const abouturl = `${PUBLIC_PATH}about`

const links = [
  {
    text: 'Overview',
    route: '/overview/introduction',
    children: [
      { text: 'Introduction', route: '/overview/introduction' },
      { text: 'Tracking Progress', route: '/overview/tracking-progress' }
    ]
  },
  {
    text: 'Compliance',
    route: '/compliance/dashboard',
    children: [
      { text: 'Agency Compliance', route: '/compliance/dashboard' },
      { text: 'How to Procure Software', route: '/compliance/procurement' },
      {
        text: 'How to Inventory',
        route: '/compliance/inventory-code',
        children: [{ text: 'Validate Schema', route: '/compliance/inventory-code/validate-schema' }]
      }
    ]
  },
  {
    text: 'Open Source Pilot',
    route: '/open-source/introduction',
    children: [
      { text: 'Introduction', route: '/open-source/introduction' },
      { text: 'Tools and Resources', route: '/open-source/resources' },
      { text: 'How to Measure', route: '/open-source/measuring-code' },
      { text: 'Licensing', route: '/open-source/licensing' }
    ]
  }
]

const pagesForSelect = [
  { display: 'Overview - Introduction', route: '/overview/introduction' },
  { display: 'Overview - Tracking Progress', route: '/overview/tracking-progress' },
  { display: 'Compliance - Agency Compliance', route: '/compliance/dashboard' },
  { display: 'Compliance - How to Procure Software', route: '/compliance/procurement' },
  { display: 'Compliance - How to Inventory', route: '/compliance/inventory-code' },
  { display: 'Compliance - Validate Schema', route: '/compliance/inventory-code/validate-schema' },
  { display: 'Open Source Pilot - Introduction', route: '/open-source/introduction' },
  { display: 'Open Source Pilot - Tools and Resources', route: '/open-source/resources' },
  { display: 'Open Source Pilot - How to Measure', route: '/open-source/measuring-code' },
  { display: 'Open Source Pilot - Licensing', route: '/open-source/licensing' }
].map(({ display, route }) => ({ display, route: abouturl + route }))

class AboutPage extends Component {
  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', event => {
      if (window.location.pathname.startsWith(abouturl)) {
        scrollToTopOfResults()
      }
    })
  }

  onNavChange() {
    scrollToTopOfResults()
  }

  render() {
    return (
      <div>
        <SiteBanner title="ABOUT" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'About' }]} />
        <br />
        <div className="indented">
          <div className="show-w-lte-600" style={{ padding: '30px', textAlign: 'center' }}>
            <NavSelect pages={pagesForSelect} />
          </div>
          <div className="width-quarter show-w-gt-600 sticky">
            <SideNav
              alignment="left"
              baseurl={abouturl}
              links={links}
              onLinkClick={::this.onNavChange}
            />
          </div>
          <div className="docs-content">
            <Switch>
              <Route path={`${abouturl}/overview/introduction`} component={OverviewIntroduction} />
              <Route
                path={`${abouturl}/overview/tracking-progress`}
                component={OverviewTrackingProgress}
              />
              <Redirect from={`${abouturl}/overview`} to={`${abouturl}/overview/introduction`} />

              <Route path={`${abouturl}/compliance/dashboard`} component={ComplianceDashboard} />
              <Route path={`${abouturl}/compliance/procurement`} component={Procurement} />
              <Route
                path={`${abouturl}/compliance/inventory-code/validate-schema`}
                component={JSONValidator}
              />
              <Route path={`${abouturl}/compliance/inventory-code`} component={InventoryCode} />
              <Redirect from={`${abouturl}/compliance`} to={`${abouturl}/compliance/dashboard`} />

              <Route
                path={`${abouturl}/open-source/introduction`}
                component={OpenSourceIntroduction}
              />
              <Route path={`${abouturl}/open-source/resources`} component={Resources} />
              <Route path={`${abouturl}/open-source/measuring-code`} component={MeasuringCode} />
              <Route path={`${abouturl}/open-source/licensing`} component={Licensing} />
              <Redirect
                from={`${abouturl}/open-source`}
                to={`${abouturl}/open-source/introduction`}
              />
            </Switch>
          </div>
        </div>
        <br />
        <br />
      </div>
    )
  }
}

export default AboutPage
