/* global PUBLIC_PATH */

import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import MobileMenuControl from 'components/mobile-menu-control'
import { map } from '@code.gov/cautious'
import MobileMenuSearchBoxComponent from 'components/mobile-menu-search-box'
import { PrimaryMenuOption, SecondaryDropdown, SearchBoxDropDown } from './subcomponents'

export default class Menu extends Component {
  /*
  static propTypes = {
    menu: PropTypes.array.isRequired
  } */

  constructor(props) {
    super(props)
    this.state = {
      // expanded: false,
      // height: 'auto',
      // notAtTop: false,
      menu: props.menu,
      mobileMenu: false
    }

    this.onToggleMenuOption = this.onToggleMenuOption.bind(this)
    this.onToggleMobileMenu = this.onToggleMobileMenu.bind(this)
    this.header = React.createRef()
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', () => {
  //     const scrollTop =
  //       (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
  //     this.setState({ notAtTop: scrollTop !== 0 })
  //   })

  //   document.addEventListener('click', event => {
  //     const target = event.target
  //     const header = this.header.current
  //     if (target !== header && !header.contains(target)) {
  //       this.collapse()
  //     }
  //   })
  // }

  onToggleMobileMenu(event) {
    console.log('toggled')
    const mobileMenu = !this.state.mobileMenu
    this.setState({ mobileMenu })
    console.log(this.state.mobileMenu)
  }

  onToggleMenuOption(selected, event) {
    const menu = this.state.menu.map(menuOption => {
      if (menuOption.name === selected.name) {
        menuOption.expanded = true
      }
      return menuOption
    })

    selected.expanded = !selected.expanded

    // const height = selected.expanded ? 74 + 47 * selected.links.length : 'auto'

    //  @TODO `expanded` just returns `true`; possibly copied over from previous
    //        implementation?
    // const expanded = this.state.menu.some(menuOption => menuOption.expanded)
    // this.setState({ expanded, menu, height })
    this.setState({ menu })
  }

  // onClickMenuOption(selected, event) {
  //   const menu = this.state.menu.map(menuOption => {
  //     if (menuOption.name === selected.name) {
  //       menuOption.expanded = true
  //     }
  //     return menuOption
  //   })

  //   selected.expanded = !selected.expanded

  //   const height = selected.expanded ? 74 + 47 * selected.links.length : 'auto'

  //   //  @TODO `expanded` just returns `true`; possibly copied over from previous
  //   //        implementation?
  //   const expanded = this.state.menu.some(menuOption => menuOption.expanded)
  //   this.setState({ expanded, menu, height })
  // }

  get expanded() {
    return this.state.menu.some(option => option.expanded)
  }

  get menus() {
    return this.props.menu.map(menuOption => (
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
      // expanded: false,
      // height: 'auto',
      menu
    })

    const mobileMenu = false
    this.setState({ mobileMenu })
  }

  render() {
    const { color, onHomePage, siteTitle, toggleSearchDropdown } = this.props

    // const headerClassName = `main ${color}`

    // let navClassName = `main ${color}`
    // if (this.state.expanded) navClassName += ' expanded'
    // if (this.state.notAtTop) navClassName += ' not-at-top'

    // const navStyle = { height: this.state.height }

    return (
      <>
        <div className="usa-overlay" />
        <header className="usa-header usa-header--basic bg-white">
          <div className="usa-nav-container">
            <div className="usa-navbar">
              <div className="usa-logo" id="basic-logo">
                <CustomLink to="/" className="svg-container" title={`${siteTitle} Home`}>
                  <img
                    src={color === 'white' ? this.props.logoDark : this.props.logoLight}
                    alt="code.gov"
                    className="height-4 maxw-card"
                    aria-label="Home"
                  />
                </CustomLink>
              </div>
              <button className="usa-menu-btn bg-white" onClick={::this.onToggleMobileMenu}>
                <i
                  className="icon icon-menu text-primary font-body-xl"
                  role="img"
                  aria-label="open menu"
                />
              </button>
            </div>
            <nav
              aria-label="Primary navigation"
              className={this.state.mobileMenu ? 'usa-nav is-visible' : 'usa-nav'}
            >
              <button className="usa-nav__close" onClick={::this.onToggleMobileMenu}>
                <i
                  className="icon icon-close text-primary font-body-lg padding-right-4 padding-top-2"
                  role="img"
                  aria-label="close menu"
                />
              </button>
              <ul className="usa-nav__primary usa-accordion">
                {map(this.props.menu, menuOption => (
                  <li className="usa-nav__primary-item" key={menuOption.name}>
                    <PrimaryMenuOption
                      menuOption={menuOption}
                      onClick={::this.onToggleMenuOption}
                    />
                    <SecondaryDropdown menuOption={menuOption} onClick={::this.collapse} />
                  </li>
                ))}
              </ul>
              <div className="mobile-search-bar">
                <MobileMenuSearchBoxComponent
                  mobileMenu={this.state.mobileMenu}
                  toggleMobileMenu={::this.onToggleMobileMenu}
                />

                {/* <form class="usa-search usa-search--small" role="search">
                  <label class="usa-sr-only" for="basic-search-field-small">Search small</label>
                  <input class="usa-input" id="basic-search-field-small" type="search" name="search"/>
                  <button class="usa-button" type="submit"><span class="usa-sr-only">Search</span></button>
                </form> */}
              </div>
            </nav>
          </div>
        </header>
      </>

      // <header className={headerClassName} ref={this.header}>
      //   <nav className={navClassName} style={navStyle} aria-label="primary">
      //     <MobileMenuControl />

      //     <CustomLink to="/" className="svg-container" title={`${siteTitle} Home`}>
      //       <img
      //         src={color === 'white' ? this.props.logoDark : this.props.logoLight}
      //         alt="code.gov"
      //         className="height-4 maxw-card"
      //       />
      //     </CustomLink>

      //     <ul role="menubar" aria-label="primary">
      //       {map(this.props.menu, menuOption => (
      //         <li
      //           className={menuOption.expanded ? 'expanded' : 'margin-bottom-0'}
      //           key={menuOption.name}
      //           role="none"
      //         >
      //           <PrimaryMenuOption menuOption={menuOption} onClick={::this.onClickMenuOption} />
      //           <SecondaryDropdown menuOption={menuOption} onClick={::this.collapse} />
      //         </li>
      //       ))}
      //     </ul>
      //   </nav>
      // </header>
    )
  }
}
