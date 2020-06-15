/* global PUBLIC_PATH */

import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'
import HomeBannerSearchBox from '../home-banner-search-box'

export default class HomeBanner extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section id="banner-home" className="margin-top-5">
        <div className="bg-primary text-center padding-top-2">
          <div className="padding-y-4">
            <div className="font-heading-2xl text-white">{this.props.motto}</div>
            <div className="font-heading-lg text-white show-w-gt-1200">{this.props.subtitle}</div>
          </div>
          <div className="bg-primary-lighter padding-y-3">
            <div className="grid-container">
              <div className="grid-row">
                <div className="tablet:grid-col">
                  <HomeBannerSearchBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
