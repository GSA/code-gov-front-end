/* global PUBLIC_PATH */

import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import { map } from '@code.gov/cautious'
import { PrimaryMenuOption, SecondaryDropdown } from './subcomponents'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: props.menu,
      mobileMenu: false
    }

    this.onToggleMenuOption = this.onToggleMenuOption.bind(this)
    this.onToggleMobileMenu = this.onToggleMobileMenu.bind(this)
    this.header = React.createRef()
  }

  onToggleMobileMenu(event) {
    const mobileMenu = !this.state.mobileMenu
    this.setState({ mobileMenu })
  }

  onToggleMenuOption(selected, event) {
    const menu = this.state.menu.map(menuOption => {
      if (menuOption.expanded && menuOption.name !== selected.name) {
        menuOption.expanded = false
      }
      if (menuOption.name === selected.name) {
        selected.expanded = !selected.expanded
        return selected
      }
      return menuOption
    })
    this.setState({ menu })
  }

  get menus() {
    return this.state.menu.map(menuOption => (
      <Fragment key={menuOption.name}>
        <PrimaryMenuOption menuOption={menuOption} onClick={this.onToggleMenuOption} />
        <SecondaryDropdown menuOption={menuOption} />
      </Fragment>
    ))
  }

  collapse() {
    const menu = this.state.menu.map(menuOption => {
      menuOption.expanded = false
      return menuOption
    })

    this.setState({
      menu
    })

    const mobileMenu = false
    this.setState({ mobileMenu })
  }

  render() {
    const { color, siteTitle } = this.props
    return (
      <>
        <div className="usa-overlay" />
        <header className="usa-header usa-header--basic bg-white">
          <div className="usa-nav-container">
            <div className="usa-navbar border-bottom-0">
              <div className="usa-logo" id="basic-logo">
                <CustomLink to="/" className="svg-container code-logo" title={`${siteTitle} Home`}>
                  <img
                    src={color === 'white' ? this.props.logoDark : this.props.logoLight}
                    alt="code.gov"
                    className="height-4 maxw-card"
                    aria-label="Home"
                  />
                </CustomLink>
              </div>
              <button
                className="usa-menu-btn bg-white"
                onClick={::this.onToggleMobileMenu}
                aria-labelledby="open-menu"
              >
                <i
                  className="icon icon-menu text-primary font-body-xl"
                  role="img"
                  aria-label="open menu"
                  id="open-menu"
                />
              </button>
            </div>
            <nav
              role="navigation"
              aria-label="Primary navigation"
              className={this.state.mobileMenu ? 'usa-nav is-visible' : 'usa-nav'}
            >
              <button
                className="usa-nav__close"
                onClick={::this.onToggleMobileMenu}
                aria-labelledby="close-menu"
              >
                <i
                  className="icon icon-close text-primary font-body-lg padding-right-4 padding-top-2"
                  role="img"
                  aria-label="close menu"
                  id="close-menu"
                />
              </button>
              <ul className="usa-nav__primary usa-accordion">
                {map(this.state.menu, menuOption => (
                  <li className="usa-nav__primary-item" key={menuOption.name}>
                    <PrimaryMenuOption
                      menuOption={menuOption}
                      onClick={::this.onToggleMenuOption}
                      onSelectLink={::this.onToggleMobileMenu}
                    />
                    <SecondaryDropdown menuOption={menuOption} onClick={::this.collapse} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
      </>
    )
  }
}
