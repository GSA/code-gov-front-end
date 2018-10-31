/* global fetch */
import React, { Component, Fragment } from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import SiteBanner from 'components/site-banner'

class PolicyGuidePage extends Component {

  constructor(props) {
    super(props)
    this.mounted = false
    this.state = {}
  }

  componentDidMount() {
    this.mounted = true
    if (this.props.url) {
      fetch(this.props.url)
      .then(response => response.text())
      .then(html => {
        if (!this.state.html && this.mounted) {
          this.setState({ html })
        }
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    if (this.state.html) {
      return <div dangerouslySetInnerHTML={{ __html: this.state.html }} style={{background: 'white', padding: '2em 2em 3em', wordBreak: 'break-word'}}></div>
    } else {
      return <div></div>
    }
  }
}

export default class PolicyGuide extends Component {

  render() {
    console.log("this.props.match:", this.props.match)
    const baseurl = "https://raw.githubusercontent.com/GSA/code-gov-policy-guide/master/pages/html/"
    const matchUrl = this.props.match.url
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
              {pages.map(({ display, route }) => {
                return <li key={route}><NavLink activeClassName="current" to={`${matchUrl}/${route}`}>{display}</NavLink></li>
              })}
              </ul>
            </nav>
          </div>
          <div className="width-three-quarters">
            <Route exact path="/" render={() => <Redirect to={`${this.props.match.url}/introduction`} /> } />
            {pages.map(({ route, filename }) => {
              const path = `${matchUrl}/${route}`
              const url = baseurl + filename + '.html'
              return <Route key={path} path={path} component={() => <PolicyGuidePage url={url}/>} />
            })}
          </div>
        </div>
      </div>
    )
  }
}
