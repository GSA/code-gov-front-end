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
import OverviewWebsites from './overview-websites.component'
import OverviewAPIs from './overview-apis.component'
import OverviewNoticeAndComment from './overview-notice-and-comment.component'

const featuredprojectsurl = `${PUBLIC_PATH  }featured-projects`

const links = [
  {
    text: 'Overview',
    route: '/overview/introduction',
    children: [
      { text: 'Introduction', route: '/overview/introduction' },
      { text: 'Websites', route: '/overview/websites' },
      { text: 'APIs', route: '/overview/apis' },
      { text: 'Notice and Comment', route: '/overview/notice-and-comment' }
    ]
  }
]

const pagesForSelect = [
  { display: 'Overview - Introduction', route: '/overview/introduction' },
  { display: 'Overview - Websites', route: '/overview/websites' },
  { display: 'Overview - APIs', route: '/overview/apis' },
  { display: 'Overview - Notice and Comment', route: '/overview/notice-and-comment' }
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
              <Route path={`${featuredprojectsurl}/overview/websites`} component={OverviewWebsites}/>
              <Route path={`${featuredprojectsurl}/overview/apis`} component={OverviewAPIs}/>
              <Route path={`${featuredprojectsurl}/overview/notice-and-comment`} component={OverviewNoticeAndComment}/>
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