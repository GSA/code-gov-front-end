import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function PrimaryMenuOption ({ menuOption, onClick }) {
  console.log("starting PrimaryMenuOption with menuOption, and onClick", menuOption, onClick)
  const textContent = menuOption.name;
  if (menuOption.url) {
    return (
      <Link
        to={menuOption.url}
        role="menuitem"
        /*onClick={this.closeAllMenus}*/
      >{textContent}</Link>
    )
  }
  else {
    return (
      <a
        aria-haspopup="true"
        href="javascript:void(0);"
        tabIndex="0"
        role="menuitem"
        onClick={(event) => onClick(menuOption, event)}
      >{textContent}</a>
    );
  }
}