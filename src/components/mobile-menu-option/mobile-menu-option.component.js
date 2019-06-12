import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import CustomLink from 'components/custom-link'
import { map, startsWith } from '@code.gov/cautious'

export default class MobileMenuOption extends Component {
  get dropdown() {
    const { menuOption } = this.props
    if (Array.isArray(menuOption.links)) {
      return (
        <ul>
          {map(menuOption.links, link => {
            const { name, url } = link
            if (startsWith(url, 'http') || startsWith(url, 'mailto')) {
              return (
                <li key={url}>
                  <a href={url} onClick={this.props.hideMobileMenu} target="_blank">
                    {name}
                  </a>
                </li>
              )
            }
            return (
              <li key={url}>
                <CustomLink
                  className={this.isLinkActive({ name, url }) ? 'active' : ''}
                  onClick={this.props.hideMobileMenu}
                  to={url}
                >
                  {name}
                </CustomLink>
              </li>
            )
          })}
        </ul>
      )
    }
    return null
  }

  isTopOptionActive() {
    const { name, links, url } = this.props.menuOption
    if (url) {
      return this.isLinkActive({ name, url })
    }
    if (links) {
      return links.some(this.isLinkActive)
    }
    return false
  }

  isLinkActive({ name, url }) {
    return window.location.href.includes(url)
  }

  get topoption() {
    const { links, name, url } = this.props.menuOption
    const hasChildren = Array.isArray(links)
    const active = this.isTopOptionActive()
    if (hasChildren) {
      const className = `dropdown${active ? ' active' : ''}`
      return (
        <a className={className} onClick={() => this.props.toggleMobileMenuOption(name)}>
          {name}
        </a>
      )
    }
    if (startsWith(url, 'http') || startsWith(url, 'mailto')) {
      return (
        <a href={url} onClick={this.props.hideMobileMenu} target="_blank">
          {name}
        </a>
      )
    }
    const className = active ? ' active' : ''
    return (
      <CustomLink className={className} to={url} onClick={this.props.hideMobileMenu}>
        {name}
      </CustomLink>
    )
  }

  render() {
    const expanded = this.props.expandedMobileMenuOptions.includes(this.props.menuOption.name)
    return (
      <li className={expanded ? 'expanded' : 'collapsed'}>
        {this.topoption}
        {this.dropdown}
      </li>
    )
  }
}
