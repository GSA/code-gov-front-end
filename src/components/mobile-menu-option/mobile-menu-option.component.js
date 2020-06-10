import React, { Component } from 'react'
import CustomLink from 'components/custom-link'
import { map, startsWith } from '@code.gov/cautious'

export default class MobileMenuOption extends Component {
  get dropdown() {
    const { menuOption } = this.props
    if (Array.isArray(menuOption.links)) {
      return (
        <ul className="margin-top-0">
          {map(menuOption.links, link => {
            const { name, url } = link
            if (startsWith(url, 'http') || startsWith(url, 'mailto')) {
              return (
                <li className="margin-bottom-0" key={url}>
                  <a
                    href={url}
                    onClick={this.props.hideMobileMenu}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name}
                  </a>
                </li>
              )
            }
            return (
              <li className="margin-bottom-0" key={url}>
                <CustomLink
                  className={this.isLinkActive({ url }) ? 'active' : ''}
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
        <a href={url} onClick={this.props.hideMobileMenu} target="_blank" rel="noopener noreferrer">
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

  isTopOptionActive() {
    const { links, url } = this.props.menuOption
    if (url) {
      return this.isLinkActive({ url })
    }
    if (links) {
      return links.some(this.isLinkActive)
    }
    return false
  }

  isLinkActive({ url }) {
    return window.location.href.includes(url)
  }

  render() {
    const expanded = this.props.expandedMobileMenuOptions.includes(this.props.menuOption.name)
    return (
      <li className={expanded ? 'expanded margin-bottom-0' : 'collapsed margin-bottom-0'}>
        {this.topoption}
        {this.dropdown}
      </li>
    )
  }
}
