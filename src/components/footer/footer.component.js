import React, { PureComponent } from 'react'
import CustomLink from 'components/custom-link'
import { map, startsWith } from '@code.gov/cautious'

export default class Footer extends PureComponent {
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
                      <a
                        className="link"
                        href={link.url}
                        target="_blank"
                        key={link.name}
                        rel="noopener noreferrer"
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
          <div className="footer-part logos">
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
        </div>
      </footer>
    )
  }
}
