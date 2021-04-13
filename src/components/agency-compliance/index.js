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
import Procurement from './procurement.component.js'

const _baseurl = `/agency-compliance`

const links = [
  { text: 'Agency Compliance', route: '/compliance/dashboard' },
  { text: 'How to Procure Software', route: '/compliance/procurement' },
  { text: 'How to Inventory Code', route: '/compliance/inventory-code' }
]

const pagesForSelect = [
  { display: 'Agency Compliance', route: '/compliance/dashboard' },
  { display: 'How to Procure Software', route: '/compliance/procurement' },
  { display: 'How to Inventory Code', route: '/compliance/inventory-code' }
].map(({ display, route }) => ({ display, route: _baseurl + route }))

class AgencyCompliance extends Component {
  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', event => {
      if (window.location.pathname.startsWith(_baseurl)) {
        scrollToTopOfResults()
      }
    })
  }

  onNavChange() {
    scrollToTopOfResults()
  }

  render() {
    return (
      <main role="main" id="main-content">
        <SiteBanner title="GUIDANCE" />
        {/* <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Guidance' }]} /> */}
        <div className="grid-container grid-row tablet-lg:margin-top-4 margin-top-2">
          <div className="tablet-lg:display-none display-block padding-bottom-4">
            <NavSelect pages={pagesForSelect} />
          </div>
          <div className="grid-row grid-gap">
            <div className="grid-col tablet-lg:grid-col-3 tablet-lg:display-block display-none sticky height-viewport">
              <SideNav
                alignment="left"
                baseurl={_baseurl}
                links={links}
                onLinkClick={::this.onNavChange}
              />
            </div>
            <div className="grid-col tablet-lg:grid-col-9">
              <Switch>
                <Route path={`${_baseurl}/compliance/dashboard`} component={ComplianceDashboard} />
                <Route path={`${_baseurl}/compliance/procurement`} component={Procurement} />
                <Route path={`${_baseurl}/compliance/inventory-code`} component={InventoryCode} />
                <Redirect from={`${_baseurl}/compliance`} to={`${_baseurl}/compliance/dashboard`} />
              </Switch>
            </div>
          </div>
        </div>
        <br />
        <br />
      </main>
    )
  }
}

export default AgencyCompliance
