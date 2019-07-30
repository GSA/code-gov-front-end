/* global PUBLIC_PATH */
/* global customElements */
/* global fetch */
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Breadcrumbs from 'components/breadcrumbs'
import NavSelect from 'components/nav-select'
import SiteBanner from 'components/site-banner'
import SideNav from 'components/side-nav'
import { refreshView,scrollToTopOfResults } from 'utils/other'
import ComplianceDashboard from './compliance-dashboard.component'
import InventoryCode from './inventory-code.component'
import JSONValidator from './json-validator.component'
import OverviewIntroduction from './overview-introduction.component'
import OverviewTrackingProgress from './overview-tracking-progress.component'
import Procurement from './procurement.component.js'
import OpenSourceIntroduction from './open-source-introduction.component'
import Resources from './resources.component'
import MeasuringCode from './measuring-code.component'
import Licensing from './licensing.component'

const featuredprojectsurl = `${PUBLIC_PATH  }featured-projects`

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
        children: [
          { text: 'Validate Schema', route: '/compliance/inventory-code/validate-schema' }
        ]
      },
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
]
.map(({display, route}) => ({display, route: featuredprojectsurl + route}))

class FeaturedProjects extends Component {

  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', event => {
      if (window.location.pathname.startsWith(featuredprojectsurl)) {
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
        <SiteBanner title='FEATURED PROJECTS' />
        <Breadcrumbs crumbs={[
          { text: 'Home', to: '/' },
          { text: 'Featured Projects' }
        ]}/>
        <br/>
        <div className='indented'>
          <div className='show-w-lte-600' style={{padding: '30px', textAlign: 'center'}}>
            <NavSelect pages={pagesForSelect} />
          </div>
          <div className='width-quarter show-w-gt-600 sticky' >
            <SideNav
              alignment='left'
              baseurl={featuredprojectsurl}
              links={links}
              onLinkClick={::this.onNavChange}
            />
          </div>
          <div className='docs-content'>
            <Switch>

              <Route path={`${featuredprojectsurl}/overview/introduction`} component={OverviewIntroduction}/>
              <Route path={`${featuredprojectsurl}/overview/tracking-progress`} component={OverviewTrackingProgress}/>
              <Redirect from={`${featuredprojectsurl}/overview`} to={`${featuredprojectsurl}/overview/introduction`}/>

              <Route path={`${featuredprojectsurl}/compliance/dashboard`} component={ComplianceDashboard}/>
              <Route path={`${featuredprojectsurl}/compliance/procurement`} component={Procurement}/>
              <Route path={`${featuredprojectsurl}/compliance/inventory-code/validate-schema`} component={JSONValidator}/>
              <Route path={`${featuredprojectsurl}/compliance/inventory-code`} component={InventoryCode}/>
              <Redirect from={`${featuredprojectsurl}/compliance`} to={`${featuredprojectsurl}/compliance/dashboard`}/>

              <Route path={`${featuredprojectsurl}/open-source/introduction`} component={OpenSourceIntroduction}/>
              <Route path={`${featuredprojectsurl}/open-source/resources`} component={Resources}/>
              <Route path={`${featuredprojectsurl}/open-source/measuring-code`} component={MeasuringCode}/>
              <Route path={`${featuredprojectsurl}/open-source/licensing`} component={Licensing}/>
              <Redirect from={`${featuredprojectsurl}/open-source`} to={`${featuredprojectsurl}/open-source/introduction`}/>

            </Switch>
          </div>
        </div>
        <br/>
        <br/>
      </div>
    )
  }
}

export default FeaturedProjects