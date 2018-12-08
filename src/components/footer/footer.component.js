/* global PUBLIC_PATH */
import React, { Component } from 'react'
import CustomLink from 'components/custom-link'
import { map, startsWith } from '@code.gov/cautious'

export default class Footer extends Component {
''
  render() {
    return (
      <footer className={this.props.color} role="contentinfo">
        <div className="footer-content">
          <div className="footer-part links">
            <ul>
              {map(this.props.links, link => {
                if (startsWith(link.url, 'http') || startsWith(link.url, 'mailto')) {
                  return (
                    <li key={link.name}>
                      <a className="link" href={link.url} target="_blank" key={link.name}>
                        <span>{link.name}</span>
                      </a>
                    </li>
                  )
                } else {
                  return (
                    <li key={link.name}>
                      <CustomLink to={link.url} className="link">
                        <span>{link.name}</span>
                      </CustomLink>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
          <div className="footer-part logos">
            <ul>
              {map(this.props.logos, logo => {
                return (
                  <li key={logo.name}>
                    <a href={logo.url} target="_blank" rel="noopener">
                      <img src={logo.image} alt={logo.name}/>
                      <span>{logo.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}
