import React from 'react'
import CustomLink from 'components/custom-link'

export default function PrimaryMenuOption({ menuOption, onClick, onSelectLink }) {
  const textContent = menuOption.name
  const idx = `${menuOption.name}-menu`
  if (menuOption.url) {
    return (
      <CustomLink
        to={menuOption.url}
        className="text-base-dark usa-nav__link"
        role="menuitem"
        onClick={event => onSelectLink(event)}
      >
        {textContent}
      </CustomLink>
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
