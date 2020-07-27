import React, { Component, Fragment } from 'react'

export default class GovBanner extends Component {
  state = {
    dropDown: false
  }

  toggleDropDown = () => {
    this.setState(state => ({ dropDown: !state.dropDown }))
  }

  render() {
    const smallUsFlagURI =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAG1BMVEUdM7EeNLIeM7HgQCDaPh/bPh/bPx/////bPyBEby41AAAAUElEQVQI123MNw4CABDEwD3jC/9/MQ1BQrgeOSkIqYe2o2FZtthXgQLgbHVMZdlsfUQFQnHtjP1+8BUhBDKOqtmfot6ojqPzR7TjdU+f6vkED+IDPhTBcMAAAAAASUVORK5CYII='
    const dotGovIconURI =
      'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCA1NCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyMzc4YzM7fS5jbHMtMntmaWxsOm5vbmU7c3Ryb2tlOiMwMDVlYTI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5kb3QgZ292IGljb248L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTM2LjUsMjAuOTF2MS4zNkgzNS4xNWEwLjcxLDAuNzEsMCwwLDEtLjczLjY4SDE4LjIzYTAuNzEsMC43MSwwLDAsMS0uNzMtMC42OEgxNi4xNFYyMC45MWwxMC4xOC00LjA3Wm0wLDEzLjU3djEuMzZIMTYuMTRWMzQuNDhhMC43MSwwLjcxLDAsMCwxLC43My0wLjY4aDE4LjlBMC43MSwwLjcxLDAsMCwxLDM2LjUsMzQuNDhaTTIxLjU3LDIzLjYydjguMTRoMS4zNlYyMy42MmgyLjcxdjguMTRIMjdWMjMuNjJoMi43MXY4LjE0aDEuMzZWMjMuNjJoMi43MXY4LjE0aDAuNjNhMC43MSwwLjcxLDAsMCwxLC43My42OHYwLjY4SDE3LjVWMzIuNDVhMC43MSwwLjcxLDAsMCwxLC43My0wLjY4aDAuNjNWMjMuNjJoMi43MVoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtMiIgY3g9IjI3IiBjeT0iMjcuMTIiIHI9IjI2Ii8+PC9zdmc+'
    const httpsIconURI =
      'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCA1NCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3MTlmMmE7fS5jbHMtMntmaWxsOm5vbmU7c3Ryb2tlOiM1MzgyMDA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5odHRwcyBpY29uPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zNC43MiwzNC44NGExLjI5LDEuMjksMCwwLDEtMS4yOSwxLjI5SDIwLjU3YTEuMjksMS4yOSwwLDAsMS0xLjI5LTEuMjlWMjcuMTJhMS4yOSwxLjI5LDAsMCwxLDEuMjktMS4yOUgyMVYyMy4yNmE2LDYsMCwwLDEsMTIsMHYyLjU3aDAuNDNhMS4yOSwxLjI5LDAsMCwxLDEuMjksMS4yOXY3LjcyWm0tNC4yOS05VjIzLjI2YTMuNDMsMy40MywwLDAsMC02Ljg2LDB2Mi41N2g2Ljg2WiIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMjciIGN5PSIyNy4xMiIgcj0iMjYiLz48L3N2Zz4='
    const { dropDown } = this.state
    let hideText = ''
    const accordionContent = {}
    if (dropDown) {
      accordionContent.hidden = false
      hideText = 'display-none'
    } else {
      accordionContent.hidden = true
    }

    return (
      <section aria-label="Official government website" className="usa-banner bg-base-darker">
        <div className="usa-accordion">
          <header className="usa-banner__header">
            <div className="usa-banner__inner">
              <div className="grid-col-auto">
                <img className="usa-banner__header-flag" src={smallUsFlagURI} alt="U.S. flag" />
              </div>
              <div className="grid-col-fill tablet:grid-col-auto tablet:padding-right-0 padding-right-6">
                <p className="usa-banner__header-text text-white">
                  An official website of the United States government
                </p>
                <p
                  className={`usa-banner__header-action text-primary-lighter ${hideText}`}
                  aria-hidden="true"
                >
                  Here&apos;s how you know
                </p>
              </div>
              <button
                className="usa-accordion__button usa-banner__button"
                aria-expanded={dropDown}
                aria-controls="gov-banner"
                onClick={this.toggleDropDown}
              >
                <span className="usa-banner__button-text text-primary-lighter">
                  Here&apos;s how you know
                </span>
              </button>
            </div>
          </header>
          <div
            className="usa-banner__content usa-accordion__content"
            id="gov-banner"
            {...accordionContent}
          >
            <div className="grid-row grid-gap-lg">
              <div className="usa-banner__guidance tablet:grid-col-6">
                <img
                  className="usa-banner__icon usa-media-block__img"
                  src={dotGovIconURI}
                  alt="Dot gov"
                />
                <div className="usa-media-block__body text-white">
                  <p className="text-white font-body-xs">
                    <strong>Official websites use .gov</strong>
                    <br /> A <strong>.gov</strong> website belongs to an official government
                    organization in the United States.
                  </p>
                </div>
              </div>
              <div className="usa-banner__guidance tablet:grid-col-6">
                <img
                  className="usa-banner__icon usa-media-block__img"
                  src={httpsIconURI}
                  alt="Https"
                />
                <div className="usa-media-block__body text-white">
                  <p className="text-white font-body-xs">
                    {' '}
                    <strong>Secure .gov websites use HTTPS</strong>
                    <br /> A <strong>lock</strong> (
                    <span className="icon-lock">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 64"
                        className="usa-banner__lock-image"
                        role="img"
                        aria-labelledby="banner-lock-title banner-lock-description"
                      >
                        <title id="banner-lock-title">Lock</title>
                        <desc id="banner-lock-description">A locked padlock</desc>
                        <path
                          fill="#ffffff"
                          fillRule="evenodd"
                          d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"
                        />
                      </svg>
                    </span>
                    ) or <strong>https://</strong> means you’ve safely connected to the .gov
                    website. Share sensitive information only on official, secure websites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
