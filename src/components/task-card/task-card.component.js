import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash.get'
import { capitalize, join, some } from '@code.gov/cautious'
import { getLastModifiedDateString } from 'utils/repo-parsing'


function Part({ title, text }) {
  return (
    <div>
      <dt>{title + ':'}</dt>
      <dd>{text || 'N/A'}</dd>
    </div>
  )
}

export default class TaskCardComponent extends Component {


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
    const agencyAcronym = get(this.props, 'task.agency.acronym')
    const agencyName = get(this.props, 'task.agency.name')
    if (agencyAcronym && agencyName) {
      return (
        <div>
          <dt>Agency:</dt>
          <dd><Link to={`/browse-projects?agencies=${agencyAcronym}`}>{agencyName}</Link></dd>
        </div>
      )
    }
 }

  get dateLastModified() {
    const text = getLastModifiedDateString(this.props.task) || 'N/A'
    return Part('Last updated', text)
  }

  render() {
    const task = this.props.task

    return (
      <div className="card focusable">

        {this.cardTitle}

        {this.cardDescription}

        <dl className="show-w-gt-900">

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
