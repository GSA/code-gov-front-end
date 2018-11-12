import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
      menu: props.menu,
      searchBoxShown: false,
      showMobileMenu: false
    }

    this.onClickMenuOption = this.onClickMenuOption.bind(this)

    window.addEventListener('scroll', () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      this.setState({ notAtTop: scrollTop !== 0 })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* We have to use JSON stringify here for change detection because
      the expanded object is nested inside an object */
    const propsChanged = JSON.stringify(nextProps.menu) !== JSON.stringify(this.props.menu)
    const stateChanged = JSON.stringify(nextState) !== JSON.stringify(this.state);

    if (propsChanged || stateChanged) {
      this.setState(nextProps)
    }
    return true;
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

  get logo() {
    return (
      <Link to="/" className="svg-container" title={this.props.siteTitle + ' Home'}>
        <img src={this.props.color === 'white' ? this.props.logoDark : this.props.logoLight} alt="code.gov"/>
    </Link>
    )
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

    let headerClassName = `main ${this.props.color}`
    if (this.props.transparent) headerClassName += ' transparent'

    let navClassName = `main ${this.props.color}`
    if (this.state.expanded) navClassName += ' expanded'
    if (this.state.notAtTop) navClassName += ' not-at-top'

    let navStyle = { 'height': this.state.height }

    return (
      <header className={headerClassName}>
        <nav className={navClassName} style={navStyle} aria-label="primary">

          <MobileMenuControl />

          {this.logo}

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
          <ul className="right">
            <li>
              <a className="no-underline" onClick={this.props.toggleSearchDropdown}>
                <i className="icon icon-search"></i>
              </a>
            </li>
          </ul>
        </nav>
        <SearchBoxDropDown />
      </header>
    );
  }
};
