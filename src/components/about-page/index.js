/* global PUBLIC_PATH */
/* global customElements */
/* global fetch */
import React, { Component, Fragment } from 'react'
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom'
import client from 'api-client'
import { loadScript } from 'utils/other'
import Breadcrumbs from 'components/breadcrumbs'
import LazyHTML from 'components/lazy-html'
import NavSelect from 'components/nav-select'
import SiteBanner from 'components/site-banner'
import SideNav from 'components/side-nav'
import { refreshView,scrollToTopOfResults } from 'utils/other'

const abouturl = PUBLIC_PATH + 'about'

const dataurl = PUBLIC_PATH + 'assets/plugins/about-page/'

const onDashboard = ['DHS', 'DOC', 'DOD', 'DOE', 'DOI', 'DOJ', 'DOL', 'DOS', 'DOT', 'ED', 'EPA', 'GSA', 'HHS', 'HUD', 'NASA', 'NRC', 'NSF', 'OPM', 'SBA', 'SSA', 'TREASURY', 'USAID', 'USDA', 'VA']

const configJSON = {
  scores: {
    'compliant': [1, null],
    'partial': [0.25, 0.9999999],
    'noncompliant': [null, 0.244444444]
  },
  text: [
    {
      req: 'agencyWidePolicy',
      variants: {
        compliant: 'Agency policy is consistent with the Federal Source Code Policy.',
        noncompliant: 'Agency policy has not been reviewed for consistency with the Federal Source Code Policy.',
        partial: 'Agency policy is being updated for consistency with the Federal Source Code Policy.'
      }
    },
    {
      req: 'openSourceRequirement',
      variants: {
        compliant: 'Agency has open sourced greater than 20% of their custom developed code.',
        noncompliant: 'Agency has open sourced less than 10% of their custom developed code.',
        partial: 'Agency has open sourced greater than 10% of their custom developed code.'
      }
    },
    {
      req: 'inventoryRequirement',
      variants: {
        compliant: 'Agency has inventoried 100% of new custom code.',
        noncompliant: 'Agency has inventoried less than 50% of new custom code.',
        partial: 'Agency has inventoried more than 50% of new custom code.'
      }
    }
  ]
};

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
.map(({display, route}) => ({display, route: abouturl + route}))

const OverviewIntroduction = () => <LazyHTML url={`${dataurl}overview/introduction.html`}/>
const OverviewTrackingProgress = () => <LazyHTML url={`${dataurl}overview/tracking-progress.html`}/>

class ComplianceDashboard extends Component {

  constructor(props) {
    super(props)
    this.loading = false
    this.state = {}
  }

  componentDidMount() {
    if (!this.loading) {
      const webcomponent = customElements.get('compliance-dashboard')
      if (!webcomponent) {
        loadScript(PUBLIC_PATH + 'webcomponents/compliance-dashboard.js', true)
      }
      client.getCompliance().then(compliance => {
        compliance = compliance.filter(agency => onDashboard.includes(agency.acronym))
        compliance.forEach(agency => {
          agency.img = PUBLIC_PATH + `assets/img/logos/agencies/${agency.acronym}-50x50.png`
        })
        this.setState( { compliance })
      })
    }
  }

  render() {
    return (
      <Fragment>
        <LazyHTML url={`${dataurl}compliance/agency-compliance.html`}/>
        <compliance-dashboard
          id='compliance-dashboard'
          config={JSON.stringify(configJSON)}
          data={JSON.stringify(this.state.compliance)}
        />
      </Fragment>
    )
  }
}

const Procurement = () => <LazyHTML url={`${dataurl}compliance/how-to-procure.html`}/>

class InventoryCode extends Component {

  constructor(props) {
    super(props)
    this.loading = false
    this.state = {}
  }

  componentDidMount() {
    if (!this.loading) {
      this.loading = true
      const webcomponent = customElements.get('json-schema')
      if (!webcomponent) {
        loadScript(PUBLIC_PATH + 'webcomponents/json-schema.js', true)
      }
    }
  }

  render() {
    return (
      <Fragment>
        <LazyHTML url={`${dataurl}compliance/how-to-inventory-a.html`}/>
        <json-schema url={PUBLIC_PATH + 'assets/data/schema.json'} />
        <LazyHTML url={`${dataurl}compliance/how-to-inventory-b.html`}/>
      </Fragment>
    )
  }
}

class JSONValidator extends React.Component {

  constructor(props) {
    super(props)
    this.loading = false
    this.state = {}
  }

  componentDidMount() {
    if (!this.loading) {
      this.loading = true
      const webcomponent = customElements.get('json-schema-validator')
      if (!webcomponent) {
        loadScript(PUBLIC_PATH + 'webcomponents/json-schema-validator.js', true)
      }
    }
  }

  render() {
    return (
      <Fragment>
        <h1>Code.json Validator</h1>
        <p>Please enter your code.json file below in order to validate it correctly meets the specification.</p>
        <json-schema-validator
          ajv={PUBLIC_PATH + 'external/ajv.min.js'}
          jsoneditor={PUBLIC_PATH + 'external/jsoneditor'}
          metaschema={PUBLIC_PATH + 'assets/data/json-schema-draft-04.json'}
          schema={PUBLIC_PATH + 'assets/data/schema.json'}
        />
      </Fragment>
    )
  }
}

const OpenSourceIntroduction = () => <LazyHTML url={`${dataurl}open-source-pilot/introduction.html`}/>
const Resources = () => <LazyHTML url={`${dataurl}open-source-pilot/tools-and-resources.html`}/>
const MeasuringCode = () => <LazyHTML url={`${dataurl}open-source-pilot/how-to-measure-code.html`}/>
const Licensing = () => <LazyHTML url={`${dataurl}open-source-pilot/licensing.html`}/>

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
        <SiteBanner title='ABOUT' />
        <Breadcrumbs crumbs={[
          { text: 'Home', to: '/' },
          { text: 'About' }
        ]}/>
        <br/>
        <div className='indented'>
          <div className='show-w-lte-600' style={{padding: '30px', textAlign: 'center'}}>
            <NavSelect pages={pagesForSelect} />
          </div>
          <div className='width-quarter show-w-gt-600 sticky' >
            <SideNav
              alignment='left'
              baseurl={abouturl}
              links={links}
              onLinkClick={::this.onNavChange}
            />
          </div>
          <div className='docs-content'>
            <Switch>

              <Route path={`${abouturl}/overview/introduction`} component={OverviewIntroduction}/>
              <Route path={`${abouturl}/overview/tracking-progress`} component={OverviewTrackingProgress}/>
              <Redirect from={`${abouturl}/overview`} to={`${abouturl}/overview/introduction`}/>

              <Route path={`${abouturl}/compliance/dashboard`} component={ComplianceDashboard}/>
              <Route path={`${abouturl}/compliance/procurement`} component={Procurement}/>
              <Route path={`${abouturl}/compliance/inventory-code/validate-schema`} component={JSONValidator}/>
              <Route path={`${abouturl}/compliance/inventory-code`} component={InventoryCode}/>
              <Redirect from={`${abouturl}/compliance`} to={`${abouturl}/compliance/dashboard`}/>

              <Route path={`${abouturl}/open-source/introduction`} component={OpenSourceIntroduction}/>
              <Route path={`${abouturl}/open-source/resources`} component={Resources}/>
              <Route path={`${abouturl}/open-source/measuring-code`} component={MeasuringCode}/>
              <Route path={`${abouturl}/open-source/licensing`} component={Licensing}/>
              <Redirect from={`${abouturl}/open-source`} to={`${abouturl}/open-source/introduction`}/>

            </Switch>
          </div>
        </div>
        <br/>
        <br/>
      </div>
    )
  }
}

export default AboutPage
export {
  ComplianceDashboard,
  InventoryCode,
  JSONValidator,
  OverviewIntroduction,
  OverviewTrackingProgress,
  OpenSourceIntroduction,
  Resources,
  MeasuringCode,
  Licensing,
  Procurement
}
