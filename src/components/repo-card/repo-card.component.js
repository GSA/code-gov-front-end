import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import get from 'lodash.get'
import { some } from '@code.gov/cautious'
import {
  getLastModifiedDateString,
  getDisplayTextForUsageType,
  getLicenseName
} from 'utils/repo-parsing'
import CardPart from 'components/card-part'
import QualityTag from '../quality-tag'

export default class RepoCardComponent extends Component {
  get goToButton() {
    const url = get(this.props.repo, 'repositoryURL')
    if (typeof url === 'string' && url.includes('github.com')) {
      return (
        <div className="tablet:grid-col-3 desktop:grid-col-2 margin-bottom-2 grid-col-12 margin-top-5 tablet:margin-top-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="usa-button font-heading-2xs padding-x-2 pin-bottom pin-right"
          >
            Go to Repo
            <p className="usa-sr-only">{this.props.repo.name}</p>
          </a>
        </div>
      )
    }
  }

  get repoDescription() {
    const description = get(this.props.repo, 'description')
    if (description) {
      return (
        <div className="width-full usa-card__body font-body-2xs">
          {description.substring(0, 400)}
        </div>
      )
    }
  }

  get repoOrg() {
    const agencyOrg = get(this.props.repo, 'organization')
    if (agencyOrg) {
      return (
        <Fragment>
          <li>
            {' '}
            <span className="text-bold">Organization: </span>
            {agencyOrg}
          </li>
        </Fragment>
      )
    }
  }

  get repoLanguages() {
    const repo = this.props.repo

    if (some(repo.languages)) {
      // convert array of languages into string
      return repo.languages.map(lang => lang).join(', ')
    }

    // @TODO: replace with "", and let component fill in `Not Available`
    return 'Not Available'
  }

  render() {
    const repo = this.props.repo
    const agencyAcronym = get(repo, 'agency.acronym')
    const agencyName = get(repo, 'agency.name')
    const score = get(repo, 'score')
    const dateLastModified = getLastModifiedDateString(this.props.repo) || 'Not Available'
    const usageType = getDisplayTextForUsageType(this.props.repo)
    const license = getLicenseName(this.props.repo)
    const url = get(this.props.repo, 'repositoryURL')
    const marginBottom =
      url && typeof url === 'string' && url.includes('github.com')
        ? 'margin-bottom-0'
        : 'margin-bottom-105'

    return (
      <li className="usa-card width-full margin-bottom-2">
        <div className="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 card-list-item">
          <QualityTag className="display-flex flex-justify-end" score={score} />
          <header className="usa-card__header grid-col-9">
            <h3 className="usa-card__heading font-heading-lg margin-top-0">
              <CustomLink to={`/projects/${repo.repoID}`} className="project-link">
                {repo.name}
              </CustomLink>
            </h3>
          </header>

          {this.repoDescription}

          <ul className="width-full usa-card__body font-body-3xs padding-bottom-3 border-bottom-1px border-base-light">
            <li>
              {' '}
              <span className="text-bold">Agency: </span>
              <CustomLink to={`/browse-projects?agencies=${agencyAcronym}`}>
                {agencyName}
              </CustomLink>
            </li>
            {this.repoOrg}
            <li>
              <span className="text-bold">Last Updated: </span>
              {dateLastModified}
            </li>
          </ul>

          <div className="usa-card__footer font-body-3xs padding-bottom-1 padding-top-1px grid-container margin-0">
            <div className={`grid-row ${marginBottom}`}>
              <ul className="display-inline-block tablet:grid-col-9 desktop:grid-col-10 grid-col-12 padding-0">
                <CardPart title="Usage Type" text={usageType} />
                <CardPart title="Languages" text={this.repoLanguages} />
                <CardPart title="License" text={license} />
              </ul>
              {this.goToButton}
            </div>
          </div>
        </div>
      </li>
    )
  }
}
