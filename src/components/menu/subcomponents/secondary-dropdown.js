import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'
import { some, startsWith } from '@code.gov/cautious'

function LinkPart({ name, onClick, url }) {
  if (startsWith(url, 'http') || startsWith(url, 'mailto')) {
    return (
      <a href={url} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    )
  }
  return (
    <CustomLink to={url} onClick={onClick}>
      {name}
    </CustomLink>
  )
}

export default function SecondaryDropdown({ menuOption, onClick }) {
  if (some(menuOption.links)) {
    if (menuOption.expanded) {
      return (
        <ul id={`${menuOption.name}-menu`} className="usa-nav__submenu">
          {menuOption.links.map(link => {
            const { name, url } = link
            return (
              <li className="usa-nav__submenu-item" key={url}>
                <LinkPart name={name} onClick={onClick} url={url} />
              </li>
            )
          })}
        </ul>
      )
    }
    return (
      <ul id={`${menuOption.name}-menu`} className="usa-nav__submenu" hidden>
        {menuOption.links.map(link => {
          const { name, url } = link
          return (
            <li className="usa-nav__submenu-item" key={url}>
              <LinkPart name={name} onClick={onClick} url={url} />
            </li>
          )
        })}
      </ul>
    )
  }
  return <Fragment />
}
