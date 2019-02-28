/* global PUBLIC_PATH */

import React, { Component, Fragment } from 'react'
import CustomLink from 'components/custom-link'
import { PrimaryMenuOption, SecondaryDropdown, SearchBoxDropDown } from './subcomponents'
import MobileMenuControl from 'components/mobile-menu-control'
import { map } from '@code.gov/cautious'

export default class Menu extends Component {
  /*
  static propTypes = {
    menu: PropTypes.array.isRequired
  }*/

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      height: 'auto',
      notAtTop: false,
      menu: props.menu
    }

    this.onClickMenuOption = this.onClickMenuOption.bind(this)
    this.header = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      this.setState({ notAtTop: scrollTop !== 0 })
    })

    document.addEventListener('click', event => {
      const target = event.target
      const header = this.header.current
      if (target !== header && !header.contains(target)) {
        this.collapse()
      }
    })
  }

  onClickMenuOption(selected, event) {

    const menu = this.state.menu.map(menuOption => {
      if (menuOption !== selected) {
        menuOption.expanded = false
      }
      return menuOption
    })

    selected.expanded = !selected.expanded;

    const height = selected.expanded ? 74 + 40 * selected.links.length : 'auto'

    const expanded = this.state.menu.some(menuOption => menuOption.expanded)

    this.setState({ expanded, menu, height })
  }

  get expanded() {
    return this.state.menu.some(option => option.expanded)
  }

  get menus() {
    return this.props.menu.map(menuOption => (
      <Fragment key={menuOption.name}>
        <PrimaryMenuOption menuOption={menuOption} onClick={this.onClickMenuOption}/>
        <SecondaryMenuOption menuOption={menuOption} />
      </Fragment>
    ));
  }

  collapse() {
    const menu = this.state.menu.map(menuOption => {
        menuOption.expanded = false
        return menuOption
    })

    this.setState({
      expanded: false,
      height: 'auto',
      menu
    })
  }

  render() {

    const { color, onHomePage, siteTitle, toggleSearchDropdown } = this.props

    let headerClassName = `main ${color}`
    if (onHomePage) headerClassName += ' transparent'

    let navClassName = `main ${color}`
    if (this.state.expanded) navClassName += ' expanded'
    if (this.state.notAtTop) navClassName += ' not-at-top'

    const navStyle = { 'height': this.state.height }

    return (
      <header className={headerClassName} ref={this.header}>
        <nav className={navClassName} style={navStyle} aria-label="primary">

          <MobileMenuControl />

          <CustomLink to="/" className="svg-container" title={siteTitle + ' Home'}>
            <img src={color === 'white' ? this.props.logoDark : this.props.logoLight} alt="code.gov"/>
          </CustomLink>

          <ul role="menubar" aria-label="primary">
            {map(this.props.menu, menuOption => {
              return (
                <li className={(menuOption.expanded ? 'expanded' : '')} key={menuOption.name} role="none">
                  <PrimaryMenuOption menuOption={menuOption} onClick={::this.onClickMenuOption}/>
                  <SecondaryDropdown menuOption={menuOption} onClick={::this.collapse}/>
                </li>
              )
            })}
          </ul>
          {onHomePage === false && <ul className="right show-w-gt-800">
            <li>
              <a className="no-underline" onClick={toggleSearchDropdown}>
                <i className="icon icon-search"></i>
              </a>
            </li>
          </ul> }
        </nav>
        {onHomePage === false && <SearchBoxDropDown /> }
      </header>
    );
  }
};
