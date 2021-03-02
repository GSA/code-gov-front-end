import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Breadcrumbs from 'components/breadcrumbs'
import NavSelect from 'components/nav-select'
import SiteBanner from 'components/site-banner'
import SideNav from 'components/side-nav'
import { refreshView, scrollToTopOfResults } from 'utils/other'
import CodeGovProgram from './code-gov-program.component'
import FederalSourceCodePolicy from './federal-source-code-policy.component'

const _baseurl = `/about`

const links = [
  { text: 'Code.gov Program', route: '/code-gov-program' },
  { text: 'The Federal Source Code Policy', route: '/federal-source-code-policy' }
]

const pagesForSelect = [
  { display: 'Code.gov Program', route: '/code-gov-program' },
  { display: 'The Federal Source Code Policy', route: '/federal-source-code-policy' }
].map(({ display, route }) => ({ display, route: _baseurl + route }))

class About extends Component {
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
      <main id="main-content">
        <SiteBanner title="ABOUT" />
        {/* <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Agencies' }]} /> */}
        <div className="grid-container grid-row tablet-lg:margin-top-4 margin-top-2">
          <div className="tablet-lg:display-none display-block padding-bottom-4">
            <NavSelect pages={pagesForSelect} />
          </div>
          <div className="grid-row grid-gap">
            <div className="grid-col tablet-lg:grid-col-3 tablet-lg:display-block display-none sticky">
              <SideNav
                alignment="left"
                baseurl={_baseurl}
                links={links}
                onLinkClick={::this.onNavChange}
              />
            </div>
            <div className="grid-col tablet-lg:grid-col-9">
              <CodeGovProgram />
              <FederalSourceCodePolicy />
            </div>
          </div>
        </div>
        <br />
        <br />
      </main>
    )
  }
}

export default About
