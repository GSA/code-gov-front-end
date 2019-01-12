import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CustomLinkComponent extends Component {
  onClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
    this.props.updateStore(this.props.to)
  }

  render() {
    const { children, className, title, to } = this.props
    if (children) {
      return (
        <Link className={className} title={title} to={to} onClick={::this.onClick}>
          {children}
        </Link>
      )
    }
    return <Link className={className} title={title} to={to} onClick={::this.onClick} />
  }
}
