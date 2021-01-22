import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import get from 'lodash.get'
import { some } from '@code.gov/cautious'
import { getLastModifiedDateString } from 'utils/repo-parsing'
import CardPart from 'components/card-part'
import CardOrgs from 'components/card-orgs'
import QualityTag from '../quality-tag'

export default class AgencyCardComponent extends Component {
  get goToButton() {
    const url = get(this.props.agency, 'codeUrl')
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
            <p className="usa-sr-only">{this.props.agency.name}</p>
          </a>
        </div>
      )
    }
  }

  get repoDescription() {
    const description = get(this.props.agency, 'description')
    if (description) {
      return (
        <div className="width-full usa-card__body font-body-2xs">
          {description.substring(0, 400)}
        </div>
      )
    }
  }

  get repoOrg() {
    const agencyOrg = get(this.props.agency, 'organization')
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
    const agency = this.props.agency

    if (some(agency.languages)) {
      // convert array of languages into string
      return agency.languages.map(lang => lang).join(', ')
    }

    // @TODO: replace with "", and let component fill in `Not Available`
    return 'Not Available'
  }

  render() {
    const agency = this.props.agency
    const agencyAcronym = this.props.agency.acronym
    const agencyName = this.props.agency.name // get(repo, 'agency.name')
    const score = this.props.agency.score
    const orgs = this.props.agency.orgs
    const dateLastModified = getLastModifiedDateString(this.props.agency) || 'Not Available'
    const usageType = 'Whatever'
    const license = 'Share it'
    const url = this.props.agency.codeUrl
    const img = `${PUBLIC_PATH}assets/img/logos/agencies/${agencyAcronym}-50x50.png`
    const marginBottom =
      url && typeof url === 'string' && url.includes('github.com')
        ? 'margin-bottom-0'
        : 'margin-bottom-105'

    const websiteLink = agency.website || '#'
    // console.log(this.props.agency);
    return (
      <li className="usa-card width-full margin-bottom-2">
        <div className="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 card-list-item">
          <div className="usa-card__media usa-card__media--inset display-block pin-top pin-right">
            {/* prettier-ignore */}
            <img src={img} alt={`${agencyName} logo`} />
          </div>
          <header className="usa-card__header grid-col-9">
            <h3 className="usa-card__heading font-heading-lg margin-top-0">
              <a href={websiteLink} target="_blank" rel="noopener noreferrer">
                {agency.name}
              </a>
            </h3>
          </header>

          <ul className="width-full usa-card__body font-body-3xs padding-bottom-3 border-bottom-1px border-base-light">
            {this.repoOrg}
            <li>
              <span className="text-bold">Code.JSON: </span>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          </ul>

          <div className="usa-card__footer font-body-3xs padding-bottom-1 padding-top-1px grid-container margin-0">
            <div className={`grid-row ${marginBottom}`}>
              <ul className="display-inline-block tablet:grid-col-9 desktop:grid-col-10 grid-col-12 padding-0">
                <CardOrgs title="Organizations" orgs={orgs} />
              </ul>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
