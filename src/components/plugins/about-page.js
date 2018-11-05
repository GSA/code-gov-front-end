/* global fetch */
import React, { Component, Fragment } from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import LazyHTML from 'components/lazy-html'
import SiteBanner from 'components/site-banner'
import SideNav from 'components/side-nav'

export default class AboutPage extends Component {

  constructor(props) {
    super(props)
    this.mounted = false
    this.state = {}
  }

  render() {
    const matchUrl = this.props.match.url
    const links = [
      {
        text: 'Overview',
        route: '/overview',
        children: [
          { text: 'Introduction', route: '/overview/introduction' },
          { text: 'Tracking Progress', route: '/overview/tracking-progress' }
        ]
      },
      {
        text: 'Compliance',
        route: '/compliance',
        children: [
          { text: 'Agency Compliance', route: '/compliance/dashboard' },
          { text: 'How to Procure Software', route: '/compliance/procurement' },
          {
            text: 'How to Inventory',
            route: '/compliance/inventory-code',
            children: [
              { text: 'Validate Schema', route: '/compliance/validate-schema' },
              { text: 'Upgrade Schema', route: '/compliance/upgrade-schema' }
            ]
          },
        ]
      },
      {
        text: 'Open Source Pilot',
        route: '/open-source',
        children: [
          { text: 'Introduction', route: '/open-source/introduction' },
          { text: 'Tools and Resources', route: '/open-source/resources' },
          { text: 'How to Measure', route: '/open-source/measuring-code' },
          { text: 'Licensing', route: '/open-source/licensing' }
        ]
      }
    ]
    const basedataurl = 'https://raw.githubusercontent.com/GSA/code-gov-about-page/master/pages/html/'
    return (
      <div>
        <SiteBanner title='ABOUT' />
        <div className="indented">
          <ul className="breadcrumbs">
            <li><Link to='/'>Home</Link></li>
            <li>ABOUT</li>
          </ul>
        </div>
        <br/>
        <div className="indented">
          <div className="width-quarter">
            <SideNav alignment="left" baseurl={matchUrl} links={links} />
          </div>
          <div className="width-three-quarters">
            <Switch>
              <Route path={`${matchUrl}/overview/introduction`} component={() => <LazyContent url={`${basedataurl}overview/introduction.html`}/>}/>
              <Route path={`${matchUrl}/overview/tracking-progress`} component={() => <LazyContent url={`${basedataurl}overview/tracking-progress.html`}/>}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
