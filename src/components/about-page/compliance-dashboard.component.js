import React from 'react'
import PropTypes from 'prop-types'

const displayStatus = {
  compliant: 'Fully compliant',
  noncompliant: 'Non-compliant',
  partial: 'Partially compliant'
}

const statusColor = {
  compliant: 'text-mint',
  noncompliant: 'text-red',
  partial: 'text-gold'
}

const borderColor = {
  compliant: 'border-mint',
  noncompliant: 'border-red',
  partial: 'border-gold'
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
  <div
    key={`${name}-${req}`}
    className={`req ${borderColor[status]} border-left-1 padding-left-1 margin-bottom-1 font-body-3xs`}
  >
    {text}
  </div>
)

const getCard = (config, entry) => {
  const { img, name, requirements } = entry
  const overallStatus = getStatusAsText(config, requirements.overall)

  return (
    <div
      className={`usa-card__container radius-0 border-base-light border-width-1px height-auto margin-bottom-2
      ${overallStatus}`}
      key={`card-${name}`}
    >
      <div className="usa-card__media usa-card__media--inset display-block pin-top pin-left">
        <img src={img} alt={`${name} logo`} />
      </div>
      <div className="usa-card__body display-block margin-left-6 margin-top-105">
        <header className="usa-card__header">
          <h3 className="usa-card__heading">{name}</h3>
          <h4 className={`h4 ${statusColor[overallStatus]}`}>{displayStatus[overallStatus]}</h4>
          {config.text.map(textPart => {
            const { req, variants } = textPart
            const status = getStatusAsText(config, entry.requirements.sub[req])

            return getReqLine(name, req, status, variants[status])
          })}
        </header>
      </div>
    </div>
  )
}

const ComplianceDashboardComponent = props => (
  <>
    <ul className="usa-card-group">
      <li className="usa-card width-full">
        {props.data.map(entry => getCard(props.config, entry))}
      </li>
    </ul>
  </>
)

ComplianceDashboardComponent.propTypes = {
  config: PropTypes.PropTypes.shape({
    scores: PropTypes.object.isRequired,
    text: PropTypes.array.isRequired
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
