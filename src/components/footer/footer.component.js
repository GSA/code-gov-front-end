/* global PUBLIC_PATH */
import { map, startsWith } from '@code.gov/cautious'
import CustomLink from 'components/custom-link'
import React, { PureComponent } from 'react'

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className={this.props.color} role="contentinfo">
        <div className="footer-content">
          <div className="footer-part links" data-test="links">
            <ul>
              {map(this.props.links, link => {
                if (startsWith(link.url, 'http') || startsWith(link.url, 'mailto')) {
                  return (
                    <li key={link.name}>
                      <a
                        className="link"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={link.name}
                      >
                        <span>{link.name}</span>
                      </a>
                    </li>
                  )
                }
                return (
                  <li key={link.name}>
                    <CustomLink to={link.url} className="link">
                      <span>{link.name}</span>
                    </CustomLink>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="footer-part logos" data-test="logos">
            <ul>
              {map(this.props.logos, logo => (
                <li key={logo.name}>
                  <a href={logo.url} target="_blank" rel="noopener noreferrer">
                    <img src={logo.image} alt={logo.name} />
                    <span>{logo.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-part socials" data-test="socials">
            <ul>
              {map(this.props.socials, social => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <div className={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}
