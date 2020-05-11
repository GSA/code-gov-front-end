import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import get from 'lodash.get'
import Breadcrumbs from 'components/breadcrumbs'
import SiteBanner from 'components/site-banner'
import {
  getLastModifiedDateString,
  getDisplayTextForUsageType,
  getLaborHours,
  getLicenseName,
  parseEmail,
  parseLanguages,
  parseRepositoryURL,
  parseTags
} from 'utils/repo-parsing'
import { filter, isURL, map, some } from '@code.gov/cautious'

export default class ProjectPage extends Component {
  constructor(props) {
    super(props)
    console.log('starting project page consturctor with props', props)
    const { repo } = props
    const { repoID } = props.match.params
    console.log('repoID is:', repoID)
    if (repoID !== get(repo, 'repoID')) {
      console.log('repoID doesm;t match', get(repo, 'repoID'))
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
        {map(tags, tag => (
          <CustomLink key={tag} to={`/search?query=${tag}`}>
            <span>
              <button className="tag">{tag}</button>
            </span>
          </CustomLink>
        ))}
      </Fragment>
    )
  }

  get usageType() {
    const text = getDisplayTextForUsageType(this.props.repo)
    if (text === 'Open Source') {
      return (
        <li>
          <span>
            <i className="icon icon-ok-circled2" />
            Open Source
          </span>
        </li>
      )
    }
    if (text === 'Gov-wide Reuse') {
      return (
        <li>
          <span>
            <i className="icon icon-arrows-cw" />
            Government-Wide Reuse
          </span>
        </li>
      )
    }
  }

  get license() {
    const text = getLicenseName(this.props.repo)
    if (text) {
      return (
        <span>
          <li>
            <i className="icon icon-certificate" />
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
            <i className="icon icon-hourglass-end" />
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
            <i className="icon icon-code" />
            {map(langs, (lang, i) => (
              <span className={`language${i === lastIndex && ' last'}`} key={lang}>
                {lang}
                <span className="comma">, </span>
              </span>
            ))}
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
            <i className="icon icon-mail" />
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

    if (url) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button className="button">Visit Repo</button>
        </a>
      )
    }
  }

  get additionalData() {
    const data = get(this.props.repo, 'additional_data')
    if (typeof data === 'object') {
      const keys = Object.keys(data)
      if (some(keys)) {
        return (
          <div>
            <br />
            {map(keys, key => {
              const value = data[key]
              return (
                <div className="metadata-entry">
                  <div className="metadata-key">{key}</div>

                  {Array.isArray(value) && (
                    <div className="metadata-value">
                      {map(value, subvalue => (
                        <div key={`${key}-${subvalue}`}>{subvalue}</div>
                      ))}
                    </div>
                  )}

                  {isURL(value) && (
                    <div className="metadata-value">
                      <a href={value} target="_blank" rel="noopener noreferrer">
                        <div>{value}</div>
                      </a>
                    </div>
                  )}

                  {!Array.isArray(value) && !isURL(value) && (
                    <div className="metadata-value">
                      <div>{value}</div>
                    </div>
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
          <SiteBanner title="Browse Projects" />
          <Breadcrumbs
            crumbs={[
              { text: 'Home', to: '/' },
              { text: agencyAcronym, to: `/browse-projects?agencies=${agencyAcronym}` },
              { text: repoName }
            ]}
          />
          <section className="repo-container indented">
            <header>
              <div className="repo-header-container">
                <h2>{repoName}</h2>
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
                {this.additionalData}
                <br />
                {this.repositoryURL}
              </div>
            </header>
          </section>
        </div>
      )
    }
    return <div>Loading Project</div>
  }
}
