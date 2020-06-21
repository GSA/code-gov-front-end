import React from 'react'
import CustomLink from 'components/custom-link'

export default function PrimaryMenuOption({ menuOption, onClick }) {
  const textContent = menuOption.name
  const idx = `${menuOption.name}-menu`
  if (menuOption.url) {
    return (
      <a className="usa-nav__link" href={menuOption.url}>
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
      className={
        idx === 0
          ? 'usa-current usa-accordion__button usa-nav__link'
          : 'usa-accordion__button usa-nav__link'
      }
      aria-expanded={menuOption.expanded ? 'true' : 'false'}
      aria-controls={idx}
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
