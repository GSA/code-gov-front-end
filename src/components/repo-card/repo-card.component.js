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
        <div className="display-inline-block pin-right pin-bottom margin-bottom-2 margin-right-3">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button className="usa-button">Go to Repo</button>
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
          <br />
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
      <li className="usa-card width-full margin-bottom-2">
        <div className="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 card-list-item">
          <quality-tag class="display-flex flex-justify-end" score={score} />
          <header className="usa-card__header margin-top-neg-3 padding-top-0">
            <h3 className="usa-card__heading font-heading-lg margin-top-0 grid-col-10">
              <CustomLink to={`/projects/${repo.repoID}`}>{repo.name}</CustomLink>
            </h3>
          </header>

          {this.repoDescription}

          <dl className="width-full usa-card__body font-body-3xs padding-bottom-4 border-bottom-1px border-base-light">
            <dt className="display-inline text-bold">Agency:</dt>
            <dd className="display-inline margin-left-1 margin-right-3">
              <CustomLink to={`/browse-projects?agencies=${agencyAcronym}`}>
                {agencyName}
              </CustomLink>
            </dd>
            <br />
            {this.repoOrg}
            <dt className="display-inline text-bold">Last Updated:</dt>
            <dd className="display-inline margin-left-1">{dateLastModified}</dd>
            <br />
          </dl>

          <div className="usa-card__footer font-body-3xs padding-bottom-1 padding-top-1px">
            <dl className="display-inline-block grid-col-8">
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
