/* global PUBLIC_PATH */
import { map, startsWith } from '@code.gov/cautious'
import CustomLink from 'components/custom-link'
import React, { PureComponent } from 'react'

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="usa-footer" role="contentinfo">
        <div className="grid-container usa-footer__return-to-top">
          <a href="#">Return to top</a>
        </div>
        <div className="usa-footer__primary-section bg-primary-lighter" data-test="links">
    <nav className="usa-footer__nav">
    <ul className="grid-row grid-gap">
              {map(this.props.links, link => {
                if (startsWith(link.url, 'http') || startsWith(link.url, 'mailto')) {
                  return (
                    <li key={link.name} className="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
                      <a
                        className="usa-footer__primary-link text-base-dark"
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
                  <li key={link.name} className="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
                    <CustomLink to={link.url} className="usa-footer__primary-link text-base-dark">
                      <span>{link.name}</span>
                    </CustomLink>
                  </li>
                )
              })}
            </ul>
    </nav>
  </div>


          <div className="usa-footer__secondary-section bg-white" data-test="logos">
          <div className="grid-container">
      <div className="grid-row grid-gap">
        <div className="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
          <div className="mobile-lg:grid-col-auto">
          <ul>
              {map(this.props.logos, logo => (
                <li key={logo.name}>
                  <a href={logo.url} target="_blank" rel="noopener noreferrer" className="text-no-underline">
                    <img src={logo.image} alt={logo.name} className="maxh-15"/>
                    <div className="mobile-lg:grid-col-auto">
                    <h3 className="usa-footer__logo-heading">{logo.name}</h3>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className="usa-footer__contact-links mobile-lg:grid-col-6">
            <ul className="usa-footer__social-links grid-row grid-gap-1" data-test="socials">
              {map(this.props.socials, social => (
                <li key={social.name} className="grid-col-auto">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="font-body-2xl"
                  >
                    <div className={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          
          
          <address className="usa-footer__address">
            <div className="usa-footer__contact-info grid-row grid-gap">
              <div className="grid-col-auto">
                <a href="mailto:info@agency.gov">code@gsa.gov</a>
              </div>
            </div>
          </address>
        </div>
      </div>
    </div>

          </div>
          

      </footer>
    )
  }
}
