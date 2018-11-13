import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CustomLinkComponent extends Component {

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
    this.props.updateRouter(this.props.to)
  }

  render() {
    const { children, className, title, to } = this.props
    if (children) {
      return <Link className={className} title={title} to={to} onClick={::this.onClick}>{children}</Link>
    } else {
      return <Link className={className} title={title} to={to} onClick={::this.onClick} />
    }
  }
}