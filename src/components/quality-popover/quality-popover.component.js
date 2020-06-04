import React, { Component } from 'react'
import CustomLink from 'components/custom-link'

export default class QualityPopover extends Component {
  constructor(props) {
    super(props)
    this.state = { activated: false }
    this.icon = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('click', event => {
      if (this.icon.current !== event.target) {
        this.setState({ activated: false })
      }
    })
  }

  onClick() {
    this.setState(state => ({
      activated: !state.activated
    }))
  }

  render() {
    let iconClassName = 'icon icon-help-circled popper'
    if (this.state.activated) iconClassName += ' activated'
    return (
      <div style={{ position: 'absolute', right: '10px', top: '60px' }}>
        <span className="data-quality-title">Data Quality Score</span>
        <div className={iconClassName} onClick={::this.onClick} ref={this.icon}>
          <div className="popover desktop left">
            The Data Quality Score is determined by using the information provided by Agencies in
            their <CustomLink to="/about/compliance/inventory-code">code.json</CustomLink> and by
            factors such as completeness and adherence to the{' '}
            <CustomLink to="/about/compliance/inventory-code">metadata schema</CustomLink>.
          </div>
          <div className="popover mobile left">
            <div className="popover-title">Data Quality Score</div>
            The Data Quality Score is determined by using the information provided by Agencies in
            their <CustomLink to="/about/compliance/inventory-code">code.json</CustomLink> and by
            factors such as completeness and adherence to the{' '}
            <CustomLink to="/about/compliance/inventory-code">metadata schema</CustomLink>.
          </div>
        </div>
      </div>
    )
  }
}
