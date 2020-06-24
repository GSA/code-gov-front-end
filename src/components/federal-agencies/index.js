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

const abouturl = `/federal-agencies`

const links = [
  { text: 'Agency Compliance', route: '/compliance/dashboard' },
  { text: 'How to Procure Software', route: '/compliance/procurement' },
  { text: 'How to Inventory Code', route: '/compliance/inventory-code' }
]

const pagesForSelect = [
  { display: 'Compliance - Agency Compliance', route: '/compliance/dashboard' },
  { display: 'Compliance - How to Procure Software', route: '/compliance/procurement' },
  { display: 'Compliance - How to Inventory Code', route: '/compliance/inventory-code' }
].map(({ display, route }) => ({ display, route: abouturl + route }))

class FederalAgencies extends Component {
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
      <div id="main-content">
        <SiteBanner title="FEDERAL AGENCIES" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Federal Agencies' }]} />
        <br />
        <div className="grid-container">
          <div className="show-w-lte-600" style={{ padding: '30px', textAlign: 'center' }}>
            <NavSelect pages={pagesForSelect} />
          </div>
          <div className="grid-row grid-gap">
            <div className="grid-col tablet:grid-col-3 show-w-gt-600 sticky">
              <SideNav
                alignment="left"
                baseurl={abouturl}
                links={links}
                onLinkClick={::this.onNavChange}
              />
            </div>
            <div className="grid-col tablet:grid-col-9">
              <Switch>
                <Route path={`${abouturl}/compliance/dashboard`} component={ComplianceDashboard} />
                <Route path={`${abouturl}/compliance/procurement`} component={Procurement} />
                <Route path={`${abouturl}/compliance/inventory-code`} component={InventoryCode} />
                <Redirect from={`${abouturl}/compliance`} to={`${abouturl}/compliance/dashboard`} />
              </Switch>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    )
  }
}

export default FederalAgencies
