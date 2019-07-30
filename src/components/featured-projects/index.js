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
import OverviewIntroduction from './overview-introduction.component'
import OverviewTrackingProgress from './overview-tracking-progress.component'

const featuredprojectsurl = `${PUBLIC_PATH  }featured-projects`

const links = [
  {
    text: 'Overview',
    route: '/overview/introduction',
    children: [
      { text: 'Introduction', route: '/overview/introduction' },
      { text: 'Tracking Progress', route: '/overview/tracking-progress' }
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