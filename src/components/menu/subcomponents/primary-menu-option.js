import React from 'react'
import CustomLink from 'components/custom-link'

export default function PrimaryMenuOption({ menuOption, onClick, onSelectLink }) {
  const textContent = menuOption.name
  const idx = `${menuOption.name}-menu`
  if (menuOption.url) {
    return (
      <button
        tabIndex="-1"
        className="padding-0 usa-nav__link width-full"
        onClick={event => onSelectLink(event)}
      >
        <CustomLink to={menuOption.url} className="text-base-dark" role="menuitem">
          {textContent}
        </CustomLink>
      </button>
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
  )
}
