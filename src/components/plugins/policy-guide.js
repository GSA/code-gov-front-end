/* global PUBLIC_PATH */
/* global fetch */
import React, { Component, Fragment } from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import LazyHTML from 'components/lazy-html'
import SiteBanner from 'components/site-banner'

const baseurl = PUBLIC_PATH + "assets/plugins/fscp-react-component/"

const pages = [
  { display: 'Introduction', route: 'introduction', filename: '0-introduction' },
  { display: '1. Objectives', route: 'objectives', filename: '1-objectives' },
  { display: '2. Scope & Applicability', route: 'scope', filename: '2-scope' },
  { display: '3. Three-Step Software Solutions Analysis', route: 'solutions-analysis', filename: '3-solutions-analysis' },
  { display: '4. Government-Wide Code Reuse', route: 'code-reuse', filename: '4-code-reuse' },
  { display: '5. Open Source Software', route: 'open-source', filename: '5-open-source' },
  { display: '6. Exceptions to Government Code Reuse', route: 'exceptions', filename: '6-exceptions' },
  { display: '7. Implementation', route: 'implementation', filename: '7-implementation' },
  { display: 'Appendix A - Definitions', route: 'appendix', filename: 'appendix' }
]

const PolicyGuidePage = ({ url }) => {
 return <div className="docs-content"><LazyHTML url={url}/></div>
}

export default class PolicyGuide extends Component {

  get routes() {
    return pages.map(({ route, filename }) => {
      const path = `${this.props.match.url}/${route}`
      const url = baseurl + filename + '.html'
      console.log("url:", url)
      return <Route key={path} path={path} component={() => <PolicyGuidePage url={url}/>} />
    })
  }

  get sidenav() {
    return pages.map(({ display, route }) => (
      <li key={route}>
        <NavLink activeClassName="current" to={`${this.props.match.url}/${route}`}>{display}</NavLink>
      </li>
    ))
  }

  render() {
    console.log("this.props.match:", this.props.match)
    const matchUrl = this.props.match.url
    return (
      <div>
        <SiteBanner title='Federal Source Code Policy' />
        <div className="indented">
          <ul className="breadcrumbs">
            <li><Link to='/'>Home</Link></li>
            <li>Federal Source Code Policy</li>
          </ul>
        </div>
        <br/>
        <div className="indented">
          <div className="width-quarter">
            <nav className="sidebar left">
              <ul>
                {this.sidenav}
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={`${this.props.match.url}/introduction`} /> } />
            {this.routes}
          </Switch>
        </div>
      </div>
    )
  }
}
