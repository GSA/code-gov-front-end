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
      return <p className="font-body-2xs margin-y-2px">{`Last updated on ${lastModifiedDate}`}</p>
    }
  }

  get repoTags() {
    const tags = parseTags(this.props.repo)
    return (
      <Fragment>
        {map(tags, tag => (
          <CustomLink
            key={tag}
            to={`/search?query=${tag}`}
            className="usa-button font-body-2xs padding-1 padding-x-205 bg-primary text-lowercase radius-md margin-top-1 width-auto"
          >
            <span className="text-white text-no-underline text-normal">{tag}</span>
          </CustomLink>
        ))}
      </Fragment>
    )
  }

  get usageType() {
    const text = getDisplayTextForUsageType(this.props.repo)
    if (text === 'Open Source') {
      return (
        <li className="margin-bottom-0">
          <i className="icon icon-ok-circled2 padding-right-05" />
          Open Source
        </li>
      )
    }
    if (text === 'Gov-wide Reuse') {
      return (
        <li className="margin-bottom-0">
          <i className="icon icon-arrows-cw padding-right-05" />
          Government-Wide Reuse
        </li>
      )
    }
  }

  get license() {
    const text = getLicenseName(this.props.repo)
    if (text) {
      return (
        <li>
          <i className="icon icon-certificate padding-right-05" />
          {text}
        </li>
      )
    }
  }

  get displayLaborHours() {
    const laborHours = getLaborHours(this.props.repo)
    if (laborHours) {
      return (
        <li>
          <i className="icon icon-hourglass-end padding-right-05" />
          {`${laborHours} hours`}
        </li>
      )
    }
  }

  get languages() {
    const langs = parseLanguages(this.props.repo)
    if (some(langs)) {
      return (
        <li>
          <i className="icon icon-code padding-right-05" />
          {langs.join(', ')}
        </li>
      )
    }
  }

  get contact() {
    const email = parseEmail(this.props.repo)
    if (email) {
      return (
        <li>
          <i className="icon icon-mail padding-right-05" />
          <a href={`mailto:${email}?Subject=Contribution%20Inquiry`} target="_top">
            {email}
          </a>
        </li>
      )
    }
  }

  get repositoryURL() {
    const url = parseRepositoryURL(this.props.repo)

    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="usa-button margin-bottom-6 margin-top-neg-2px"
        >
          Visit Repo
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
        <main id="main-content">
          <SiteBanner title="Projects" />
          <Breadcrumbs
            crumbs={[
              { text: 'Home', to: '/' },
              { text: agencyAcronym, to: `/browse-projects?agencies=${agencyAcronym}` },
              { text: repoName }
            ]}
          />
          <section className="grid-container">
            <header>
              <div className="margin-top-1">
                <h2 className="font-heading-xl">{repoName}</h2>
                {this.lastModifiedDateHTML}
                <div id="repo-tags" className="grid-row margin-top-0">
                  {this.repoTags}
                </div>
                <ul className="padding-0 font-body-2xs">
                  {this.usageType}
                  {this.license}
                  {this.displayLaborHours}
                  {this.languages}
                  {this.contact}
                </ul>
                <p className="maxw-none font-body-2xs">{repo.description}</p>
                {this.additionalData}
                <br />
                {this.repositoryURL}
              </div>
            </header>
          </section>
        </main>
      )
    }
    return <div>Loading Project</div>
  }
}
