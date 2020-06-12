/* global PUBLIC_PATH */
import { map, startsWith } from '@code.gov/cautious'
import CustomLink from 'components/custom-link'
import React, { PureComponent } from 'react'

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="usa-footer" role="contentinfo">
        <div className="grid-container usa-footer__return-to-top">
          <a href="#" className="text-bold font-body-3xs">
            Return to top
          </a>
        </div>
        <div className="usa-footer__primary-section bg-primary-lighter" data-test="links">
          <nav className="usa-footer__nav padding-top-4 tablet:padding-top-0">
            <ul className="grid-row grid-gap">
              {map(this.props.links, link => {
                if (startsWith(link.url, 'http') || startsWith(link.url, 'mailto')) {
                  return (
                    <li
                      key={link.name}
                      className="grid-col-12 tablet:grid-col-auto usa-footer__primary-content font-body-3xs margin-bottom-0"
                    >
                      <a
                        className="usa-footer__primary-link padding-bottom-1 padding-top-0 tablet:padding-y-2 text-base-dark"
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
                    className="grid-col-12 tablet:grid-col-auto usa-footer__primary-content font-body-3xs margin-bottom-0"
                  >
                    <CustomLink
                      to={link.url}
                      className="usa-footer__primary-link padding-bottom-1 padding-top-0 tablet:padding-y-2 text-base-dark"
                    >
                      <span className="text-base-dark">{link.name}</span>
                    </CustomLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="usa-footer__secondary-section bg-white show-w-gt-desktop" data-test="logos">
          <div className="grid-container">
            <div className="grid-row grid-gap">
              <div className="usa-footer__logo grid-row tablet:grid-col-12 desktop:grid-col-8">
                <div className="mobile-lg:grid-col-auto">
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
                          alt={logo.name}
                          className="maxw-15 padding-right-2 show-w-gt-desktop"
                        />
                        <div className="mobile-lg:grid-col-auto desktop:display-inline">
                          <h3 className="usa-footer__logo-heading usa-footer__primary-link font-body-3xs text-primary text-bold desktop:display-inline">
                            {logo.name}
                          </h3>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="usa-footer__contact-links desktop:grid-offset-1 desktop:padding-top-7 text-left">
                <ul
                  className="usa-footer__social-links grid-row flex-justify-start"
                  data-test="socials"
                >
                  {map(this.props.socials, social => (
                    <li key={social.name} className="grid-col-12 tablet:grid-col-3 padding-top-2">
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="font-body-xl"
                      >
                        <div className={`text-base-darker ${  social.icon}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="usa-footer__secondary-section bg-primary-lighter show-w-lte-desktop"
          data-test="logos"
        >
          <div className="grid-container">
            <div className="grid-row grid-gap">
              <div className="usa-footer__logo grid-row tablet:grid-col-12 desktop:grid-col-8">
                <div className="mobile-lg:grid-col-auto">
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
                          alt={logo.name}
                          className="maxw-15 padding-right-2 show-w-gt-desktop"
                        />
                        <div className="mobile-lg:grid-col-auto desktop:display-inline">
                          <h3 className="usa-footer__logo-heading usa-footer__primary-link font-body-3xs text-primary text-bold desktop:display-inline">
                            {logo.name}
                          </h3>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="usa-footer__contact-links desktop:grid-offset-1 desktop:padding-top-7 text-left">
                <ul
                  className="usa-footer__social-links grid-row flex-justify-start"
                  data-test="socials"
                >
                  {map(this.props.socials, social => (
                    <li key={social.name} className="grid-col-12 tablet:grid-col-3 padding-top-2">
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="font-body-xl"
                      >
                        <div className={`text-base-darker ${  social.icon}`} />
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
