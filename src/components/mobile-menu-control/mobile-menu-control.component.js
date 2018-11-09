import React, { Component, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { map } from '@code.gov/cautious'
import MobileMenu from 'components/mobile-menu'

export default class MobileMenuControl extends Component {

  render() {
    let className = 'show-w-lte-700'
    if (this.props.color === 'dark') {
      className += ' dark'
    }
    return (
      <Fragment>
        <mobile-menu-button class={className} onClick={this.props.toggleMobileMenu} open={this.props.open}/>
        <MobileMenu open={this.props.open}/>
      </Fragment>
    )
  }
}