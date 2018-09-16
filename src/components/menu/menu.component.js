import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'


/* Need to handle internal urls, external urls, and drop down */
const PrimaryMenuOption = ({ menuOption }) => {
  const textContent = menuOption.name;
  if (menuOption.url) {
    return <a textContent={textContent} target="_blank"></a>;
  } else {
    return (
      <div textContent={textContent}></div>
    );
  }  
}

/* Need to handle internal urls and external urls */
const SecondaryMenuOption = ({ menuOption }) => {
  if (menuOption.links && menuOption.links.length > 0) {
    return (
      <ul>
        {menuOption.links.map(link => {
          <a
            textContent={link.name}
          ></a>
        })}
      </ul>
    );
  }
}

export default class Menu extends Component {
  static propTypes = {
    menu: PropTypes.array.isRequired,
    displaySearchIcon: PropTypes.bool.isRequired,
  }

  state = {
    searchBoxShown: false,
  }

  get menus () {
    return this.props.menu.map((menuOption) => (
      <Fragment>
        <PrimaryMenuOption menuOption={menuOption} />
        <SecondaryMenuOption menuOption={menuOption} />
      </Fragment>
    ));
  }

  get search () {
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

  get searchIcon () {
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
    return (
      <Fragment>
        <nav>
          <mobile-menu-button></mobile-menu-button>
          <a className="svg-container" title="title + ' Home'" >
            <img src="logo" />
          </a>
          <ul>{ this.menus }</ul>
          <ul className="right">{ this.searchIcon }</ul>
        </nav>
        { this.search }
      </Fragment>
    );
  }
};