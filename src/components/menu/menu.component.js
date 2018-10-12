import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { PrimaryMenuOption, SecondaryDropdown } from './subcomponents'
import './menu.scss'

export default class Menu extends Component {
  /*
  static propTypes = {
    menu: PropTypes.array.isRequired,
    displaySearchIcon: PropTypes.bool.isRequired,
  }*/

  constructor(props) {
    super(props)
    console.log("starting consturctor with props:", props)
    this.state = {
      expanded: false,
      height: 'auto',
      notAtTop: false,
      menu: props.menu,
      searchBoxShown: false
    }

    this.onClickMenuOption = this.onClickMenuOption.bind(this)

    window.addEventListener('scroll', () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      this.setState({ notAtTop: scrollTop !== 0 })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    try {

    } catch (error) {
      console.log("This error happened in menu.component's shouldComponentUpdate")
    }
    /* We have to use JSON stringify here for change detection because
      the expanded object is nested inside an object */
    const propsChanged = JSON.stringify(nextProps) !== JSON.stringify(this.props)
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
    return this.props.menu.map((menuOption) => (
      <Fragment>
        <PrimaryMenuOption menuOption={menuOption} onClick={this.onClickMenuOption}/>
        <SecondaryMenuOption menuOption={menuOption} />
      </Fragment>
    ));
  }

  get search() {
    if (this.props.displaySearchIcon) {
      return (
        <div className={'search-box' + (this.state.searchBoxShown && 'active')}>
          <a className="close-search-box-button">
            <i className="icon icon-cancel"></i>
          </a>
          <form className="search-form">
          </form>
        </div>
      );
    }

    return null;
  }

  get searchIcon() {
    if (this.props.displaySearchIcon) {
      return (
        <li>
          <a className="no-underline">
            <i className="icon icon-search"></i>
          </a>
        </li>
      );
    }

    return null;
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

          <div className="mobile-menu-button show-w-lte-700">
            <div className="icon icon-menu"></div>
          </div>

          {this.logo}

          <ul role="menubar" aria-label="primary">
            {this.props.menu && this.props.menu.map(menuOption => {
              return (
                <li className={(menuOption.expanded ? 'expanded' : '')} key={menuOption.name} role="none">
                  <PrimaryMenuOption menuOption={menuOption} onClick={::this.onClickMenuOption}/>
                  <SecondaryDropdown menuOption={menuOption} onClick={::this.onClickMenuOption}/>
                </li>
              )
            })}
          </ul>

        </nav>
{/*          <mobile-menu-button></mobile-menu-button>
          <a className="svg-container">
            <img src={this.props.logoDark} />
          </a>
          <ul>{ this.menus }</ul>
          <ul className="right">{ this.searchIcon }</ul>
        { this.search }
      */}
      </header>
    );
  }
};
