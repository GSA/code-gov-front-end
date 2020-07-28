import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import get from 'lodash.get'
import { capitalize, join } from '@code.gov/cautious'
import { getLastModifiedDateString } from 'utils/repo-parsing'
import CardPart from 'components/card-part'

export default class TaskCardComponent extends Component {
  get cardTitle() {
    const issueURL = get(this.props.task, 'issueURL')
    const title = get(this.props.task, 'title')
    if (issueURL && title) {
      return (
        <a href={issueURL} target="_blank" rel="noopener noreferrer" className="issue-link">
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

  get cardDate() {
    const date = getLastModifiedDateString(this.props.task)
    if (date) {
      return <dd className="display-inline margin-left-2px margin-right-3">{date}</dd>
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
          <dt className="display-inline text-bold margin-right-2px">Last Updated:</dt>
          {this.cardDate}
        </Fragment>
      )
    }
  }

  render() {
    const task = this.props.task
    // const lastModifiedString = getLastModifiedDateString(this.props.task) || 'Not Available'

    return (
      <li className="usa-card width-full margin-bottom-2">
        <div className="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 height-auto card-list-item">
          <header className="usa-card__header">
            <h3 className="usa-card__heading font-heading-lg margin-top-0">{this.cardTitle}</h3>
          </header>
          {this.cardDescription}
          <dl className="width-full usa-card__body font-body-3xs padding-bottom-205 padding-top-0 border-bottom-1px border-base-light desktop:display-block display-none">
            {this.agencyLink}
          </dl>
          <div className="usa-card__footer font-body-3xs padding-bottom-1 padding-top-1px grid-container margin-0">
            <div className="grid-row margin-bottom-2 tablet-lg:margin-bottom-1">
              <ul className="display-inline-block padding-0">
                <CardPart
                  title="Languages"
                  text={join(get(task, 'languages'), ',')}
                  className="tablet:display-inline tablet:margin-right-205 display-block"
                />
                <CardPart
                  title="Type"
                  text={capitalize(get(task, 'type'))}
                  className="tablet:display-inline tablet:margin-right-205 display-block"
                />
                <CardPart
                  title="Skill Level"
                  text={capitalize(get(task, 'skill'))}
                  className="tablet:display-inline tablet:margin-right-205 display-block"
                />
                <CardPart
                  title="Effort"
                  text={capitalize(get(task, 'effort'))}
                  className="tablet:display-inline tablet:margin-right-205 display-block"
                />
              </ul>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
