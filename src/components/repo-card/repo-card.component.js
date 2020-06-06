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

export default class RepoCardComponent extends Component {
  get goToButton() {
    const url = get(this.props.repo, 'repositoryURL')
    if (typeof url === 'string' && url.includes('github.com')) {
      return (
        <div className="repo-button width-quarter">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button>Go to Repo</button>
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
          <dt className="display-inline text-bold">Organization:</dt>
          <dd className="display-inline margin-left-1 margin-right-3">{agencyOrg}</dd>
        </Fragment>
      )
    }
  }

  get repoLanguages() {
    const repo = this.props.repo
    if (some(repo.languages)) {
      const languages = repo.languages
      return (
        <CardPart
          title="Languages"
          text={languages
            .map(language => (
              <span key={language} className="language">
                {language}
              </span>
            ))
            .reduce((prev, curr) => [prev, ', ', curr])}
        />
      )
    }
    return <CardPart title="Languages" text="Not Available" />
  }

  render() {
    const repo = this.props.repo
    const agencyAcronym = get(repo, 'agency.acronym')
    const agencyName = get(repo, 'agency.name')
    const score = get(repo, 'score')
    const dateLastModified = getLastModifiedDateString(this.props.repo)
    const usageType = getDisplayTextForUsageType(this.props.repo)
    const license = getLicenseName(this.props.repo)

    return (
      <li className="usa-card width-full">
        <div className="usa-card__container hover:shadow-2">
          <quality-tag score={score} />
          <header className="usa-card__header padding-top-0">
            <h3 className="usa-card__heading font-heading-lg margin-top-0">
              <CustomLink to={`/projects/${repo.repoID}`}>{repo.name}</CustomLink>
            </h3>
          </header>

          {this.repoDescription}

          <dl className="width-full usa-card__body font-body-3xs padding-bottom-4 border-bottom-2px border-base-lighter">
            <dt className="display-inline text-bold">Agency:</dt>
            <dd className="display-inline margin-left-1 margin-right-3">
              <CustomLink to={`/browse-projects?agencies=${agencyAcronym}`}>
                {agencyName}
              </CustomLink>
            </dd>
            {this.repoOrg}
            <dt className="display-inline text-bold">Last Updated:</dt>
            <dd className="display-inline margin-left-1">{dateLastModified}</dd>
          </dl>

          <div className="usa-card__footer font-body-3xs">
            <dl className="display-inline-block width-three-quarters">
              <CardPart title="Usage Type" text={usageType} />
              {this.repoLanguages}
              <CardPart title="License" text={license} />
            </dl>
            {this.goToButton}
          </div>
        </div>
      </li>
    )
  }
}
