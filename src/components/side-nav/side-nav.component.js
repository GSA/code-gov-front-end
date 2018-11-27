import React from 'react'
import { NavLink } from 'react-router-dom'
import { len, map } from '@code.gov/cautious'

const SideNavPart = ({baseurl, links, onLinkClick}) => {
  if (len(links) > 0) {
    return (
      <ul>
        {map(links, link => {
          return (
            <li key={link.text+link.route}>
              <NavLink activeClassName="current" to={`${baseurl}${link.route}`} onClick={() => onLinkClick ? onLinkClick() : null}>{link.text}</NavLink>
              {link.children && <SideNavPart baseurl={baseurl} links={link.children} onLinkClick={onLinkClick}/>}
            </li>
          )
        })}
      </ul>
    )
  }
}

const SideNav = ({alignment, baseurl, links, onLinkClick}) => {
  alignment = alignment || ''
  baseurl = baseurl || ''
  links = links || []
  return (
    <nav className={`sidebar ${alignment}`}>
      <SideNavPart baseurl={baseurl} links={links} onLinkClick={onLinkClick}/>
    </nav>
  )
}

export default SideNav