import React from 'react'
import CustomLink from 'components/custom-link'

export default function PrimaryMenuOption({ menuOption, onClick }) {
  const textContent = menuOption.name
  if (menuOption.url) {
    return (
      <a class="usa-nav__link" href={menuOption.url}>
        <span>{textContent}</span>
      </a>
      // <CustomLink
      //   to={menuOption.url}
      //   role="menuitem"
      //   /* onClick={this.closeAllMenus} */
      // >
      //   {textContent}
      // </CustomLink>
    )
  }
  return (
    <button
      class="usa-accordion__button usa-nav__link  usa-current"
      aria-expanded={menuOption.expanded ? 'true' : 'false'}
      aria-controls={menuOption.name + '-menu'}
      onClick={event => onClick(menuOption, event)}
    >
      <span>{textContent}</span>
    </button>
    // <a
    //   aria-haspopup="true"
    //   href="javascript:void(0);"
    //   tabIndex="0"
    //   role="menuitem"
    //   onClick={event => onClick(menuOption, event)}
    // >
    //   {textContent}
    // </a>
  )
}
