import React from 'react'
import { len, map } from '@code.gov/cautious'
import { NavLink } from 'react-router-dom'

export const SideNavPart = ({ baseurl, links, onLinkClick }) => {
  const currentPage = window.location.pathname
  if (len(links) > 0) {
    return (
      <ul className="usa-sidenav">
        {map(links, link => (
          <li key={link.text + link.route} className="usa-sidenav__item">
            <NavLink
              activeClassName="usa-current"
              to={`${baseurl}${link.route}`}
              onClick={() => (onLinkClick ? onLinkClick() : null)}
            >
              {link.text}
            </NavLink>
            {link.children && (
              <SideNavPart baseurl={baseurl} links={link.children} onLinkClick={onLinkClick} />
            )}
          </li>
        ))}
      </ul>
    )
  }
}

const SideNav = ({ alignment = '', baseurl = '', links = [], onLinkClick }) => (
  <nav aria-label="Side navigation" className={`sidebar ${alignment}`}>
    <SideNavPart baseurl={baseurl} links={links} onLinkClick={onLinkClick} />
  </nav>
)

export default SideNav
