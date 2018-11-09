import React, { Component, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { map } from '@code.gov/cautious'
import { MobileMenuOption } from 'components/mobile-menu-option'

export default class Menu extends Component {

  get underlay() {
    return <div className={`mobile-menu-underlay ${this.props.open ? 'active': ''}`}></div>
  }

  render() {
    const { menu, open } = this.props
    return (
      <Fragment>
        <div className={`mobile-menu ${open ? 'open' : ''}`}>
          <ul>
            {map(menu, menuOption => {
              return (
                <MobileMenuOption
                  key={menuOption.name}
                  menuOption={menuOption}
                  onSelect={this.props.onSelect}
                />
              )
            })}
          </ul>
        </div>
        {this.underlay}
      </Fragment>
    )
  }
}