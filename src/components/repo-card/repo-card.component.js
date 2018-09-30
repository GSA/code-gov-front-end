import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash.get'


export default class RepoCardComponent extends Component {


  get dateLastModified() {
    const dateLastModified = get(this.props.repo, 'date.lastModified')
    if (dateLastModified) {
      return (
        <Fragment>
          <span>Last updated: </span>
          <span>{new Date(dateLastModified).toLocaleDateString()}</span>
        </Fragment>
      )
    }
  }

  get goToButton() {
    const url = get(this.props.repo, 'repositoryURL')
    if (typeof url === 'string' && url.includes('github.com')) {
      return (
        <div className="repo-button width-quarter">
          <Link to={url}>
            <button>Go to Repo</button>
          </Link>
        </div>
      )
    }
  }

  get repoDescription() {
    const description = get(this.props.repo, 'description')
    if (description) {
      return <p className="card-description">{description.substring(0,400)}</p>
    }
  }

  get repoLanguages() {
    const repo = this.props.repo
    if (Array.isArray(repo.languages) && repo.languages.length > 0) {
      const languages = repo.languages
      return <li>Languages: {languages.map(language => <span key={language}>&nbsp;{language}&nbsp;</span>)}</li>
    } else {
      return <li>Languages: <span>N/A </span></li>
    }
  }

  get repoLicense() {
    const license = get(this.props.repo, 'repo.permissions.licenses[0].name') || 'N/A'
    return <li>License: <span>{license}</span></li>
  }

  get usageType() {
    let text = '';
    let usageType = get(this.props.repo, 'usageType')
    if (usageType === 'openSource') {
      text = 'Open Source'
    } else if (usageType === 'governmentWideReuse') {
      text = 'Gov-wide Reuse'
    } else {
      text = usageType
    }

    return (
      <li>
        <span>Usage Type:</span>
        <span>{text}</span>
      </li>
    )
  }

  render() {
    const repo = this.props.repo
    const agencyAcronym = get(repo, 'agency.acronym')
    const agencyName = get(repo, 'agency.name')

    return (
      <div className="repo-list-item card card--focusable">

        <h3 className="card-title">
          <Link to={`/projects/${repo.repoID}`}>{repo.name}</Link>
        </h3>

        {agencyName && (
          <p className="repo-agency-icon">
            <span>{ agencyName }</span>
          </p>
        )}

        {this.repoDescription}

        <div className="agency-details">
          <span>Agency: </span>

          <Link to={`/browse-projects?agencies=${agencyAcronym}`}>{agencyName}</Link>

          {this.dateLastModified}

          <hr />

          <div className="repo-features width-three-quarters">
            <ul className="repo-features-list">
              {this.usageType}

              {this.repoLanguages}

              {this.repoLicense}
            </ul>
          </div>

          {this.goToButton}
        </div>
      </div>
    )
  }
}
