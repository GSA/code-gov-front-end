import React from 'react'
import PropTypes from 'prop-types'

const displayStatus = {
  compliant: 'Fully compliant',
  partial: 'Partially compliant',
  noncompliant: 'Non-compliant'
}

const statusColor = {
  compliant: 'text-success-dark',
  partial: 'text-warning-darker',
  noncompliant: 'text-error-dark'
}

const borderColor = {
  compliant: 'border-success',
  partial: 'border-warning',
  noncompliant: 'border-error-dark'
}

const complianceStatus = {
  green: 'compliant',
  yellow: 'partial',
  red: 'noncompliant'
}

const isCompliant = (min, max, score) =>
  typeof min === 'number' && typeof max === 'number' && min <= score && score <= max
const isPartial = (min, max, score) =>
  typeof min === 'number' && typeof max !== 'number' && min <= score
const isNoncompliant = (min, max, score) =>
  typeof min !== 'number' && typeof max === 'number' && score <= max

const getStatusAsText = ({ scores }, score) => {
  for (const status in scores) {
    const [min, max] = scores[status]

    if (
      isCompliant(min, max, score) ||
      isPartial(min, max, score) ||
      isNoncompliant(min, max, score)
    ) {
      return status
    }
  }
  return ''
}

const getStatusText = ({ scores }, score) => {
  for (const status in scores) {
    const [min, max] = scores[status]

    if (
      isCompliant(min, max, score) ||
      isPartial(min, max, score) ||
      isNoncompliant(min, max, score)
    ) {
      return status
    }
  }
  return ''
}

const getReqLine = (name, req, status, text) => (
  <div key={`${name}-${req}`} className={`${borderColor[status]} border-left-1 margin-bottom-1`}>
    <div className="padding-left-1 font-body-3xs height-auto margin-bottom-2 border-base-lighter border-bottom-1px">
      {text}
    </div>
  </div>
)

const getCard = (config, entry) => {
  const { name, metrics, acronym, logo } = entry
  const img = `${PUBLIC_PATH}assets/img/logos/agencies/${acronym}-50x50.png`

  const overallStatus = metrics.overall

  return (
    <li
      className={`usa-card radius-0 ${
        borderColor[complianceStatus[overallStatus]]
      } border-left-3 height-auto width-full margin-bottom-3`}
      key={`card-${name}`}
    >
      <div
        className="usa-card__container radius-0 height-auto border-left-width-0 border-base-light border-width-1px margin-left-0 margin-right-0"
        key={`card-${name}-2`}
      >
        <div className="usa-card__media usa-card__media--inset display-block pin-top pin-left">
          <img src={logo} alt={`${name} logo`} />
        </div>
        <div className="usa-card__body display-block mobile-lg:margin-left-6 mobile-lg:margin-top-105 margin-top-10 margin-bottom-neg-2 mobile-lg:padding-left-3 padding-left-0">
          <header className="usa-card__header">
            <h2 className="usa-card__heading text-normal">{name}</h2>
            <h3 className={`font-heading-sm margin-top-105 ${statusColor[overallStatus]}`}>
              {displayStatus[overallStatus]}
            </h3>
            {config.text.map(textPart => {
              const { req, variants } = textPart
              // const status = getStatusAsText(config, entry.requirements.sub[req])
              const status = complianceStatus[metrics[req]]

              return getReqLine(name, req, status, variants[status])
            })}
          </header>
        </div>
      </div>
    </li>
  )
}

const ComplianceDashboardComponent = props => (
  <>
    <hr className="border-2px border-primary tablet:margin-x-15 margin-x-2 margin-y-4" />
    <ul className="usa-card-group padding-x-3 dashboard-container">
      {props.inventory
        .filter(inv => inv.complianceDashboard === true)
        .map(entry => getCard(props.config, entry))}
    </ul>
  </>
)

/* prettier-ignore */
ComplianceDashboardComponent.propTypes = {
  config: PropTypes.PropTypes.shape({
    text: PropTypes.arrayOf(
      PropTypes.shape({
        req: PropTypes.string.isRequired,
        variants: PropTypes.shape({
          compliant: PropTypes.string.isRequired,
          partial: PropTypes.string.isRequired,
          noncompliant: PropTypes.string.isRequired
        })
      })
    )
  }).isRequired,
}

export default ComplianceDashboardComponent
