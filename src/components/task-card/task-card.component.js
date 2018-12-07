import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import get from 'lodash.get'
import { capitalize, join, some } from '@code.gov/cautious'
import { getLastModifiedDateString } from 'utils/repo-parsing'
import CardPart from 'components/card-part'

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
    const description = get(this.props.task, 'description')
    if (description) {
      return <p className="card-description">{description.substring(0, 250)}</p>
    }
  }

  get agencyLink() {
    const agencyAcronym = get(this.props, 'task.agency.acronym')
    const agencyName = get(this.props, 'task.agency.name')
    if (agencyAcronym && agencyName) {
      return (
        <Fragment>
          <dt>Agency:</dt>
          <dd><CustomLink to={`/browse-projects?agencies=${agencyAcronym}`}>{agencyName}</CustomLink></dd>
        </Fragment>
      )
    }
 }

  render() {
    const task = this.props.task
    const lastModifiedString = getLastModifiedDateString(this.props.task) || 'Not Available'

    return (
      <div className="card-list-item card focusable">

        {this.cardTitle}

        {this.cardDescription}

        <dl className="inline-after-600px show-w-gt-900">

          {this.agencyLink}

          <CardPart title='Last Updated' text={lastModifiedString} />

          <hr />

          <CardPart title='Languages' text={join(get(task, 'languages'), ',')} />
          <CardPart title='Type' text={capitalize(get(task, 'type'))} />
          <CardPart title='Skill Level' text={capitalize(get(task, 'skill'))} />
          <CardPart title='Effort' text={capitalize(get(task, 'effort'))} />

        </dl>
      </div>
    )
  }
}
