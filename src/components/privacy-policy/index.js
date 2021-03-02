import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Breadcrumbs from 'components/breadcrumbs'
import NavSelect from 'components/nav-select'
import SiteBanner from 'components/site-banner'
import SideNav from 'components/side-nav'
import { refreshView, scrollToTopOfResults } from 'utils/other'

import WebBlock from './web-block.component'

const _baseUrl = `/privacy-policy`
const _compUrl = `src/components/privacy-policy/html`

const sections = [
  { text: 'Protecting Privacy and Security', str: 'protecting-privacy' },
  { text: 'Information Collected', str: 'information-collected' },
  { text: 'How Code.gov uses Cookies', str: 'cookies' },
  { text: 'Google Analytics', str: 'google-analytics' },
  { text: 'Contacting the Code.gov Program Office', str: 'contacting-program-office' },
  { text: 'Children and Privacy on Code.gov', str: 'children-privacy' },
  { text: 'Security', str: 'security' },
  { text: 'Linking Policy', str: 'linking-policy' },
  { text: 'Questions about the Policies', str: 'questions' }
].map(section => ({
  text: section.text,
  display: section.text,
  html: `${section.str}.html`,
  route: `/${section.str}`,
  path: `${_compUrl}`
}))

class PrivacyPolicy extends Component {
  componentDidMount() {
    refreshView()
    window.addEventListener('popstate', event => {
      if (window.location.pathname.startsWith(_baseUrl)) {
        scrollToTopOfResults()
      }
    })
  }

  onNavChange() {
    scrollToTopOfResults()
  }

  render() {
    const containers = []

    for (const [i, val] of sections.entries()) {
      containers.push(<WebBlock key={i} componentPath={`${val.path}/`} html={val.html} />)
    }

    return (
      <main id="main-content">
        <SiteBanner title="PRIVACY POLICY" />
        {/* <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Agencies' }]} /> */}
        <div className="grid-container grid-row tablet-lg:margin-top-4 margin-top-2">
          <div className="tablet-lg:display-none display-block padding-bottom-4">
            <NavSelect
              pages={sections.map(section => ({
                display: section.display,
                route: _baseUrl + section.route
              }))}
            />
          </div>
          <div className="grid-row grid-gap">
            <div className="grid-col tablet-lg:grid-col-3 tablet-lg:display-block display-none sticky">
              <SideNav
                alignment="left"
                baseurl={_baseUrl}
                links={sections}
                onLinkClick={::this.onNavChange}
              />
            </div>
            <div className="grid-col tablet-lg:grid-col-9">{containers}</div>
          </div>
        </div>
        <br />
        <br />
      </main>
    )
  }
}

export default PrivacyPolicy
