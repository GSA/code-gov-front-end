/* global PUBLIC_PATH */

import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import CustomLink from 'components/custom-link'
import HomeBannerSearchBox from '../home-banner-search-box'

export default class HomeBanner extends Component {
  componentDidMount() {
    if (!this.props.agencies) this.props.saveAgencies()
  }

  get agencyOptions() {
    if (this.props.agencies) {
      return this.props.agencies.map(agency => (
        <option key={agency.acronym} value={agency.acronym}>
          {agency.name}
        </option>
      ))
    }
    return null
  }

  get browseDropdown() {
    if (!this.props.agencies) return null

    return (
      <div className="browse">
        <span>or </span>
        <select onChange={this.props.onBrowseByEntityChange}>
          <option>{this.props.browseByText}</option>
          <option value="All">All</option>
          {this.agencyOptions}
        </select>
      </div>
    )
  }

  get verticalRow() {
    if (this.props.helpWantedTitle || this.props.helpWantedDescription) {
      return <div className="vertical-row" />
    }
    return null
  }

  get helpWantedTitleSubsection() {
    if (this.props.helpWantedTitle) {
      return <div className="banner-subsection-title">{this.props.helpWantedTitle}</div>
    }
  }

  get helpWantedDescriptionSubsection() {
    if (this.props.helpWantedDescription) {
      return <div className="banner-subsection-subtitle">{this.props.helpWantedDescription}</div>
    }
    return null
  }

  get helpWantedButtonSubsection() {
    if (this.props.helpWantedButton) {
      return (
        <div className="buttons">
          <CustomLink to="/open-tasks">
            <button className="alt">{this.props.helpWantedButton}</button>
          </CustomLink>
        </div>
      )
    }
    return null
  }

  get issueSection() {
    if (this.props.issueUrl) {
      const openSourceRepositoryLink = ReactHtmlParser(`<a
        className="link" href=${this.props.issueUrl}
        id="issue-link" target="_blank" rel="noopener noreferrer">open source repository</a>`)
      return (
        <div>
          <br />
          <br />
          <div className="banner-subsection">
            <div className="banner-subsection-subtitle" id="issue-banner-subsection-subtitle">
              <img
                className="chat"
                src={`${PUBLIC_PATH}assets/img/icons/chat_bubble.png`}
                alt="Balloon icon representing a chat"
              />
              <span>
                Have questions or feedback? Open an issue on our {openSourceRepositoryLink}.
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // eslint-disable-next-line class-methods-use-this
  scrollToAbout() {
    console.log('home-banner.component -> scrollToAbout')
    console.log(':: PLEASE remove (eslint-disable-next-line)')
    const top = document.getElementById('banner-home').clientHeight
    const offset = document.querySelector('header nav.main').clientHeight
    window.scrollTo({
      top: top - offset,
      behavior: 'smooth'
    })
  }

  render() {
    const sectionStyle = {
      backgroundImage: `url('${this.props.backgroundImage}')`
    }
    return (
      <section id="banner-home" className="banner large" style={sectionStyle}>
        <div className="banner-content">
          <div className="banner-title">{this.props.motto}</div>
          <div className="banner-subtitle show-w-gt-1200">{this.props.subtitle}</div>
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
                </div>
              </div>
            </div>
          </div>
          {this.issueSection}
        </div>

        <a className="scroll-indicator" title="Scroll Down" onClick={this.scrollToAbout}>
          <i className="icon icon-angle-down" />
        </a>
      </section>
    )
  }
}
