import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash.get'
import { capitalize, join, some } from 'safely'


function Part(title, text) {
  return (
    <div>
      <dt>{title + ':'}</dt>
      <dd>{text || 'N/A'}</dd>
    </div>
  )
}

export default class RepoCardComponent extends Component {


  get cardTitle() {
    const issueURL = get(this.props.task, 'issueURL')
    const title = get(this.props.task, 'title')
    if (issueURL && title) {
      return (
        <h3 className="card-title">
          <a href={issueURL} target="_blank">{title}</a>
        </h3>
      )
    }
  }

  get cardDescription() {
    const description = get(this.props.task, 'description').substring(0, 250)
    if (description) {
      return <p className="card-description">{description}</p>
    }
  }

  get agencyLink() {
    const agencyAcronym = get(repo, 'agency.acronym')
    const agencyName = get(repo, 'agency.name')
    if (agencyAcronym && agencyName) {
      return (
        <div>
          <dt>Agency:
          <dd><Link to={`/browse-projects?agencies=${agencyAcronym}`}>{agencyName}</Link></dd>
        </div>
      )
    }
 }

  get dateLastModified() {
    const dateLastModified = get(this.props.repo, 'date.lastModified')
    const text = dateLastModified ? new Date(dateLastModified).toLocaleDateString() : 'N/A'
    return Part('Last updated', text)
  }

  get goToButton() {
    const url = get(this.props.repo, 'repositoryURL')
    if (typeof url === 'string' && url.includes('github.com')) {
      return (
        <div className="repo-button width-quarter">
          <a href={url} target="_blank">
            <button>Go to Repo</button>
          </a>
        </div>
      )
    }
  }

  render() {
    const task = this.props.task
    const agencyAcronym = get(repo, 'agency.acronym')
    const agencyName = get(repo, 'agency.name')
    const issueURL = get(task, 'issueURL')
    const projectURL = get(task, 'projectURL')
    const title = get(task, 'title')

    return (
      <div className="card focusable">

        {this.cardTitle}

        {this.cardDescription}

        <dl class="show-w-gt-900">

          {this.agencyLink}

          {this.dateLastModified}

          <hr />

          <Part title='Languages' text={join(get(task, 'languages'), ',')} />
          <Part title='Type' text={capitalize(get(task, 'type'))} />
          <Part title='Skill Level' text={capitalize(get(task, 'skill'))} />
          <Part title='Effort' text={capitalize(get(task, 'effort'))} />

        </dl>
      </div>
    )
  }
}
