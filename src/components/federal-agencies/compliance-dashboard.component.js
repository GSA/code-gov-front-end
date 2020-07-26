import React from 'react'
import PropTypes from 'prop-types'

const displayStatus = {
  compliant: 'Fully compliant',
  noncompliant: 'Non-compliant',
  partial: 'Partially compliant'
}

const statusColor = {
  compliant: 'text-success-dark',
  noncompliant: 'text-error-dark',
  partial: 'text-warning-darker'
}

const borderColor = {
  compliant: 'border-success',
  noncompliant: 'border-error-dark',
  partial: 'border-warning'
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

const getReqLine = (name, req, status, text) => (
  <div key={`${name}-${req}`} className={`${borderColor[status]} border-left-1 margin-bottom-1`}>
    <div className="padding-left-1 font-body-3xs height-auto margin-bottom-2 border-base-lighter border-bottom-1px">
      {text}
    </div>
  </div>
)

const getCard = (config, entry) => {
  const { img, name, requirements } = entry
  const overallStatus = getStatusAsText(config, requirements.overall)

  return (
    <li
      className={`usa-card radius-0 ${borderColor[overallStatus]} border-left-3 height-auto width-full margin-bottom-3`}
      key={`card-${name}`}
    >
      <div
        className="usa-card__container radius-0 height-auto border-left-width-0 border-base-light border-width-1px margin-left-0 margin-right-0"
        key={`card-${name}-2`}
      >
        <div className="usa-card__media usa-card__media--inset display-block pin-top pin-left">
          <img src={img} alt={`${name} logo`} />
        </div>
        <div className="usa-card__body display-block mobile-lg:margin-left-6 mobile-lg:margin-top-105 margin-top-10 margin-bottom-neg-2 mobile-lg:padding-left-3 padding-left-0">
          <header className="usa-card__header">
            <h2 className="usa-card__heading text-normal">{name}</h2>
            <h3 className={`font-heading-sm margin-top-105 ${statusColor[overallStatus]}`}>
              {displayStatus[overallStatus]}
            </h3>
            {config.text.map(textPart => {
              const { req, variants } = textPart
              const status = getStatusAsText(config, entry.requirements.sub[req])

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
      {props.data.map(entry => getCard(props.config, entry))}
    </ul>
  </>
)

ComplianceDashboardComponent.propTypes = {
  config: PropTypes.PropTypes.shape({
    scores: PropTypes.objectOf(PropTypes.object).isRequired,
    text: PropTypes.arrayOf(PropTypes.array).isRequired
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      acronym: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      requirements: PropTypes.shape({
        overall: PropTypes.number.isRequired,
        sub: PropTypes.shape({
          agencyWidePolicy: PropTypes.number.isRequired,
          inventoryRequirement: PropTypes.number.isRequired,
          openSourceRequirement: PropTypes.number.isRequired,
          schemaFormat: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    })
  ).isRequired
}

export default ComplianceDashboardComponent
