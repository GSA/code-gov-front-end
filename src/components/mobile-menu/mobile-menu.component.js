import React, { Component, Fragment } from 'react'
import { map } from '@code.gov/cautious'
import MobileMenuOption from 'components/mobile-menu-option'
import MobileMenuSearchBox from 'components/mobile-menu-search-box'

export default class Menu extends Component {
  get underlay() {
    return <div className={`mobile-menu-underlay ${this.props.open ? 'active' : ''}`} />
  }

  render() {
    const { menu, open } = this.props
    return (
      <Fragment>
        <div className={`mobile-menu ${open ? 'open' : ''}`}>
          <ul>
            <li className="search">
              <MobileMenuSearchBox />
            </li>
            {map(menu, menuOption => (
              <MobileMenuOption
                key={menuOption.name}
                menuOption={menuOption}
                onSelect={this.props.onSelect}
              />
            ))}
          </ul>
        </div>
        {this.underlay}
      </Fragment>
    )
  }
}
