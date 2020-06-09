/* global PUBLIC_PATH */

import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'
import HomeBannerSearchBox from '../home-banner-search-box'

export default class HomeBanner extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section id="banner-home" className="margin-top-8">
        <div className="bg-primary text-center">
          <div className="padding-y-2">
            <div className="font-heading-3xl text-white">{this.props.motto}</div>
            <div className="font-heading-lg text-white">{this.props.subtitle}</div>
          </div>
          <div className="bg-primary-lighter padding-y-3">
            <div>
              <HomeBannerSearchBox />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
