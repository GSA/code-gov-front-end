import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash.get'
import SiteBanner from 'components/site-banner'
import {
  getDisplayTextForUsageType,
  getLaborHours,
  getLicenseName,
  parseEmail,
  parseLanguages,
  parseRepositoryURL,
  parseTags
} from 'parsing'
import { getLastModifiedDateString } from 'utils'
import { filter, isURL, map, some } from '@code.gov/cautious'

export default class ProjectPage extends Component {

  constructor(props) {
    super(props)
    console.log("starting project page consturctor with props", props)
    const { repo } = props
    const { repoID } = props.match.params
    console.log("repoID is:", repoID)
    if (repoID !== get(repo, 'repoID')) {
      console.log("repoID doesm;t match", get(repo, 'repoID'))
      this.props.updateProject(repoID)
    }
  }

  get lastModifiedDateHTML() {
    const lastModifiedDate = getLastModifiedDateString(this.props.repo)
    if (lastModifiedDate) {
      return (
        <span className="updated">
          <div>{`Last updated on ${lastModifiedDate}`}</div>
        </span>
      )
    }
  }

  get repoTags() {
    const tags = parseTags(this.props.repo)
    return (
      <Fragment>
      {map(tags, tag => {
        return (
          <Link key={tag} to={`/search?q=${tag}`}>
            <span>
              <button className="tag">{tag}</button>
            </span>
          </Link>
        )
      })}
      </Fragment>
    )
  }

  get usageType() {
    const text = getDisplayTextForUsageType(this.props.repo)
    if (text === 'Open Source') {
      return <li><span><i className="icon icon-ok-circled2"></i>Open Source</span></li>
    } else if (text === 'Gov-wide Reuse') {
      return <li><span><i className="icon icon-arrows-cw"></i>Government-Wide Reuse</span></li>
    }
  }

  get license() {
    const text = getLicenseName(this.props.repo)
    if (text) {
      return (
        <span>
          <li>
            <i className="icon icon-certificate"></i>
            <span>{text}</span>
          </li>
        </span>
      )
    }
  }

  get displayLaborHours() {
    const laborHours = getLaborHours(this.props.repo)
    if (laborHours) {
      return (
        <span>
          <li>
            <i className="icon icon-hourglass-end"></i>
            {`${laborHours} hours`}
          </li>
        </span>
      )
    }
  }

  get languages() {
    const langs = parseLanguages(this.props.repo)
    if (some(langs)) {
      const count = langs.length
      const lastIndex = count - 1
      return (
        <span>
          <li>
            <i className="icon icon-code"></i>
            {map(langs, (lang, i) => {
              <span className={'language' + (i === lastIndex && ' last')} key={lang}>
                {lang}<span className="comma">,</span>
              </span>
            })}
          </li>
        </span>
      )
    }
  }

  get contact() {
    const email = parseEmail(this.props.repo)
    if (email) {
      return (
        <span>
          <li>
            <i className="icon icon-mail"></i>
            <a href={`mailto:${email}?Subject=Contribution%20Inquiry`} target="_top">
              {email}
            </a>
          </li>
        </span>
      )
    }
  }

  get repositoryURL() {
    const url = parseRepositoryURL(this.props.repo)
    if (Boolean(url)) {
      return <a href={url}><button className="button">Visit Repo</button></a>
    }
  }

  get additionalData() {
    const data = get(this.props.repo, 'additional_data')
    if (typeof data === 'object') {
      const keys = Object.keys(data)
      if (some(keys)) {
        return (
          <div>
            {map(keys, key => {
              const value = data[key]
              return (
                <div className="metadata-entry">
                  <div className="metadata-key">{key}</div>

                  {Array.isArray(value) && (
                    <div className="metadata-value">
                      {map(value, subvalue => <div key={key + '-' + subvalue}>{subvalue}</div>)}
                    </div>
                  )}

                  {isURL(value) && (
                    <div className="metadata-value">
                      <a href={value} target="_blank">
                        <div>{value}</div>
                      </a>
                    </div>
                  )}

                  {!Array.isArray(value) && !isURL(value) && (
                    <div className="metadata-value"><div>{value}</div></div>
                  )}
                </div>
              )
            })}
          </div>
        )
      }
    }

  }

  render() {
    const { repo } = this.props
    if (repo) {
      const agencyAcronym = repo.agency.acronym
      const repoName = repo.name
      return (
        <div className="repo-general">
          <SiteBanner title='Browse Projects' />
          <section className="repo-container indented">
            <div>
              <ul className="breadcrumbs">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/browse-projects?agencies=${agencyAcronym}`}>{agencyAcronym}</Link>
                </li>
                <li>{repoName}</li>
              </ul>
            </div>
            <header>
              <div className="repo-header-container">
                <h2>{ repoName }</h2>
                {this.lastModifiedDateHTML}
                {this.repoTags}
                <ul className="repo-features">
                  {this.usageType}
                  {this.license}
                  {this.displayLaborHours}
                  {this.languages}
                  {this.contact}
                </ul>
                <p>{repo.description}</p>
                <br/>
                {this.additionalData}
                <br/>
                {this.repositoryURL}
              </div>
            </header>

          </section>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
