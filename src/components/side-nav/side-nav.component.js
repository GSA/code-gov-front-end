import React from 'react'
import { NavLink } from 'react-router-dom'
import { len, map } from '@code.gov/cautious'

const SideNavPart = ({baseurl, links}) => {
  if (len(links) > 0) {
    return (
      <ul>
        {map(links, link => {
          return (
            <li key={link.text+link.route}>
              <NavLink activeClassName="current" to={`${baseurl}${link.route}`}>{link.text}</NavLink>
              {link.children && <SideNavPart baseurl={baseurl} links={link.children} />}
            </li>
          )
        })}
      </ul>
    )
  }
}

const SideNav = ({alignment, baseurl, links}) => {
  alignment = alignment || ''
  baseurl = baseurl || ''
  links = links || []
  return (
    <nav className={`sidebar ${alignment}`}>
      <SideNavPart baseurl={baseurl} links={links} />
    </nav>
  )
}

export default SideNav