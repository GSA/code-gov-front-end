/* global PUBLIC_PATH */

import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'
import HomeBannerSearchBox from '../home-banner-search-box'

export default class HomeBanner extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section id="banner-home" className="banner">
        <div className="banner-content">
          <div className="banner-title">{this.props.motto}</div>
          <div className="banner-subtitle show-w-gt-1200">{this.props.subtitle}</div>
          <div className="banner-search">
            <div className="banner-subsection width-half" style={{ zIndex: 30 }}>
              <div className="banner-subsection-content">
                <div className="banner-subsection-content-padder">
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
