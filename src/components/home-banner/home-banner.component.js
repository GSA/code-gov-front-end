/* global PUBLIC_PATH */

import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'
import HomeBannerSearchBox from '../home-banner-search-box'

export default class HomeBanner extends React.Component {

  componentDidMount () {
 
  }


  scrollToAbout() {
    const top = document.getElementById('banner-home').clientHeight
    const offset = document.querySelector('header nav.main').clientHeight
    window.scrollTo({
      top: top - offset,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <section id="banner-home" className="banner">
        <div className="banner-content">
          <div className="banner-title">{this.props.motto}</div>
          <div className="banner-subtitle show-w-gt-1200">{this.props.subtitle}</div>
<<<<<<< HEAD
          <div className="banner-search">
            <div className="banner-subsection width-half" style={{zIndex: 30}}>
              <div className="banner-subsection-content">
                <div className="banner-subsection-content-padder">
                  <HomeBannerSearchBox />
=======
          <div className="indented">
            <div className="banner-subsection width-half" style={{ zIndex: 30 }}>
              <div className="banner-subsection-content">
                <div className="banner-subsection-content-padder">
                  <HomeBannerSearchBox />
                  {this.browseDropdown}
                </div>
              </div>
            </div>

            {this.verticalRow}

            <div
              className="banner-subsection show-w-gt-600 width-half"
              id="banner-subsection-engage"
            >
              <div className="banner-subsection-content">
                <div className="banner-subsection-content-padder">
                  {this.helpWantedTitleSubsection}
                  {this.helpWantedDescriptionSubsection}
                  {this.helpWantedButtonSubsection}
>>>>>>> master
                </div>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
=======
        <i className="icon icon-angle-down scroll-indicator" onClick={this.scrollToAbout} />
>>>>>>> master
      </section>
    )
  }
}
