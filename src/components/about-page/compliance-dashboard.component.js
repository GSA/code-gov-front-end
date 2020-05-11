import React from 'react'
import PropTypes from 'prop-types'

const displayStatus = {
  compliant: 'Fully compliant',
  noncompliant: 'Non-compliant',
  partial: 'Partially compliant'
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
  <div key={`${name}-${req}`} className={`req ${status}`}>
    {text}
  </div>
)

const getCard = (config, entry) => {
  const { img, name, requirements } = entry
  const overallStatus = getStatusAsText(config, requirements.overall)

  return (
    <li className={`card ${overallStatus}`} key={`card-${name}`}>
      <div className="dashboard-entity-icon">
        <img src={img} alt={`${name} logo`} />
      </div>
      <div className="dashboard-entity-content">
        <div className="dashboard-entity-heading">
          <h3 className="h3">{name}</h3>
          <h4 className={`h4 ${overallStatus}`}>{displayStatus[overallStatus]}</h4>
          {config.text.map(textPart => {
            const { req, variants } = textPart
            const status = getStatusAsText(config, entry.requirements.sub[req])

            return getReqLine(name, req, status, variants[status])
          })}
        </div>
      </div>
    </li>
  )
}

const ComplianceDashboardComponent = props => (
  <>
    <div className="dashboard-container">
      <ul className="dashboard-list">{props.data.map(entry => getCard(props.config, entry))}</ul>
    </div>
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
