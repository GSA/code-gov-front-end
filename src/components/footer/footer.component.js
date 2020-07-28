/* global PUBLIC_PATH */
import { map, startsWith } from '@code.gov/cautious'
import CustomLink from 'components/custom-link'
import React, { PureComponent } from 'react'

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="usa-footer" role="contentinfo">
        <div className="grid-container usa-footer__return-to-top">
          <a href="#app" className="text-bold font-body-3xs">
            Return to top
          </a>
        </div>
        <div className="usa-footer__primary-section bg-primary-lighter" data-test="links">
          <nav className="usa-footer__nav padding-top-4 tablet-lg:padding-top-0 border-bottom-0">
            <ul className="grid-row grid-gap">
              {map(this.props.links, link => {
                if (startsWith(link.url, 'http') || startsWith(link.url, 'mailto')) {
                  return (
                    <li
                      key={link.name}
                      className="grid-col-12 tablet-lg:grid-col-auto usa-footer__primary-content font-body-3xs margin-bottom-0 border-top-0"
                    >
                      <a
                        className="usa-footer__primary-link padding-bottom-1 padding-top-0 tablet-lg:padding-y-2 text-base-dark"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={link.name}
                      >
                        <span className="text-base-dark">{link.name}</span>
                      </a>
                    </li>
                  )
                }
                return (
                  <li
                    key={link.name}
                    className="grid-col-12 tablet-lg:grid-col-auto usa-footer__primary-content font-body-3xs margin-bottom-0 border-top-0"
                  >
                    <CustomLink
                      to={link.url}
                      className="usa-footer__primary-link padding-bottom-1 padding-top-0 tablet-lg:padding-y-2 text-base-dark"
                    >
                      <span className="text-base-dark">{link.name}</span>
                    </CustomLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div
          className="usa-footer__secondary-section tablet-lg:bg-white bg-primary-lighter"
          data-test="logos"
        >
          <div className="grid-container">
            <div className="grid-row grid-gap">
              <div className="usa-footer__logo grid-col-12 tablet-lg:grid-col-8">
                {map(this.props.logos, logo => (
                  <div key={logo.name}>
                    <a
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-no-underline"
                    >
                      <img
                        src={logo.image}
                        alt={`${logo.name} logo`}
                        className="maxw-15 padding-right-2 display-none tablet-lg:display-inline"
                      />
                      <div className="mobile-lg:grid-col-auto tablet-lg:display-inline">
                        <h3 className="usa-footer__logo-heading usa-footer__primary-link font-body-3xs text-primary text-bold tablet-lg:display-inline padding-left-0">
                          {logo.name}
                        </h3>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <div className="usa-footer__contact-links tablet-lg:grid-offset-1 tablet-lg:padding-top-5 text-left tablet-lg:grid-col-3">
                <p className="padding-right-1 margin-top-0 font-body-3xs tablet-lg:grid-col-6 tablet-lg:grid-offset-6 grid-col-12">
                  <a href="mailto:code@gsa.gov">code@gsa.gov</a>
                </p>
                <ul
                  className="usa-footer__social-links grid-row flex-justify-start padding-0 margin-top-205"
                  data-test="socials"
                >
                  {map(this.props.socials, social => (
                    <li
                      key={social.name}
                      className="grid-col-12 tablet-lg:grid-col-3 tablet-lg:margin-top-neg-1 margin-top-1"
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="font-body-xl"
                      >
                        <div className={`text-base-darker display-inline-block ${social.icon}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
