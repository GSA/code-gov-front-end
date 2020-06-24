import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import get from 'lodash.get'
import { capitalize, join } from '@code.gov/cautious'
import { getLastModifiedDateString } from 'utils/repo-parsing'
import CardPart from 'components/card-part'

export default class TaskCardComponent extends Component {
  get goToIssueButton() {
    const issueGitHubURL = get(this.props.task, 'issueURL')
    if (typeof issueGitHubURL === 'string' && issueGitHubURL.includes('github.com')) {
      return (
        <div className="display-inline-block pin-right pin-bottom margin-bottom-2 margin-right-3">
          <a href={issueGitHubURL} target="_blank" rel="noopener noreferrer" className="usa-button">
            Go to Issue
          </a>
        </div>
      )
    }
  }

  get cardTitle() {
    const issueURL = get(this.props.task, 'issueURL')
    const title = get(this.props.task, 'title')
    if (issueURL && title) {
      return (
        <a href={issueURL} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      )
    }
  }

  get cardDescription() {
    const description = get(this.props.task, 'description')
    if (description) {
      return (
        <p className="width-full usa-card__body font-body-2xs">{description.substring(0, 250)}</p>
      )
    }
  }

  get agencyLink() {
    const agencyAcronym = get(this.props, 'task.agency.acronym')
    const agencyName = get(this.props, 'task.agency.name')
    const repository = get(this.props, 'task.repository')
    const projectURL = get(this.props, 'task.projectURL')
    if (agencyAcronym && agencyName) {
      return (
        <Fragment>
          <dt className="display-inline text-bold margin-right-2px">Project:</dt>
          <dd className="display-inline margin-left-2px margin-right-3">
            <a href={projectURL} target="_blank" rel="noopener noreferrer">
              {repository}
            </a>
          </dd>
          <dt className="display-inline text-bold margin-right-2px">Agency:</dt>
          <dd className="display-inline margin-left-2px margin-right-3">
            <CustomLink to={`/browse-projects?agencies=${agencyAcronym}`}>{agencyName}</CustomLink>
          </dd>
        </Fragment>
      )
    }
  }

  render() {
    const task = this.props.task
    const lastModifiedString = getLastModifiedDateString(this.props.task) || 'Not Available'

    return (
      <div className="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 height-auto margin-bottom-2 card-list-item margin-top-1">
        <header className="usa-card__header">
          <h3 className="usa-card__heading font-heading-lg margin-top-0">{this.cardTitle}</h3>
        </header>
        {this.cardDescription}
        <dl className="width-full usa-card__body font-body-3xs padding-bottom-4 border-bottom-1px border-base-light show-w-gt-1000">
          {this.agencyLink}
          <dt className="display-inline text-bold margin-right-2px">Last Updated: </dt>
          <dd className="display-inline margin-left-2px margin-right-3">{lastModifiedString}</dd>
        </dl>
        <div className="usa-card__footer font-body-3xs padding-bottom-1 padding-top-1px">
          <ul className="display-inline-block grid-col-9">
            <CardPart title="Languages" text={join(get(task, 'languages'), ',')} />
            <CardPart title="Type" text={capitalize(get(task, 'type'))} />
            <CardPart title="Skill Level" text={capitalize(get(task, 'skill'))} />
            <CardPart title="Effort" text={capitalize(get(task, 'effort'))} />
          </ul>
          {this.goToIssueButton}
        </div>
      </div>
    )
  }
}
