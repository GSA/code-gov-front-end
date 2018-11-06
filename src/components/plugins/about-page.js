/* global ASSET_PATH */
/* global customElements */
/* global fetch */
import React, { Component, Fragment } from 'react'
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom'
import { loadScript } from 'utils/other'
import LazyHTML from 'components/lazy-html'
import SiteBanner from 'components/site-banner'
import SideNav from 'components/side-nav'

const abouturl = ASSET_PATH + 'about'
console.log("abouturl;", abouturl)

const dataurl = ASSET_PATH + "assets/plugins/about-page/"
console.log("dataurl:", dataurl)

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

const OverviewIntroduction = () => <LazyHTML url={`${dataurl}overview/introduction.html`}/>
const OverviewTrackingProgress = () => <LazyHTML url={`${dataurl}overview/tracking-progress.html`}/>

class ComplianceDashboard extends React.Component {

  constructor(props) {
    super(props)
    this.loading = false
  }

  componentDidMount() {
    if (!this.loading) {
      const webcomponent = customElements.get('json-schema')
      if (!webcomponent) {
        loadScript(ASSET_PATH + 'json-schema-web-component.js')
      }
    }
  }

  render() {
    return (
      <Fragment>
        <LazyHTML url={`${dataurl}compliance/agency-compliance.html`}/>
        <json-schema url={`${ASSET_PATH}assets/data/schema.json`}/>
      </Fragment>
    )
  }
}

const AboutPage = () => {
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
          <SideNav alignment="left" baseurl={abouturl} links={links} />
        </div>
        <div className="docs-content">
          <Switch>

            <Route path={`${abouturl}/overview/introduction`} component={OverviewIntroduction}/>
            <Route path={`${abouturl}/overview/tracking-progress`} component={OverviewTrackingProgress}/>
            <Redirect from={`${abouturl}/overview`} to={`${abouturl}/overview/introduction`}/>

            <Route path={`${abouturl}/compliance/dashboard`} component={ComplianceDashboard}/>
            <Redirect from={`${abouturl}/compliance`} to={`${abouturl}/compliance/dashboard`}/>


          </Switch>
        </div>
      </div>
    </div>
  )
}

export default AboutPage