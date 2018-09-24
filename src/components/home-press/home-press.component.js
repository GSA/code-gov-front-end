import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './home-press.scss'


export default class SearchBox extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isString,
    quote: PropTypes.string.isRequired
  }

  render() {
    const bannerStyle = {
      backgroundImage: `url('${this.props.backgroundImage}')`
    }
    return (
      <section className="press" id="press-section">
        <div id="press-banner" className="banner medium" style={bannerStyle}>
          <div className="banner-content">
            <div className="indented">
              <div className="banner-title">Press</div>
              <div className="press-container">
                <div className="quote light">
                  <blockquote>{this.props.quote}</blockquote>
                  <div className="attribution">
                    <a href={this.props.attribution.url}>
                      <img className="press-logo" src={this.props.attribution.image} alt="Wired"/>
                    </a>
                  </div>
                </div>
                <div>
                  <hr />
                  <ul className="press-links">
                    {this.props.links && this.props.links.map(({image, url, alt}) => {
                      return (
                        <li key={alt}>
                          <a href={url}>
                            <img className="press-logo" src={image} alt={alt}/>
                          </a>
                        </li>
                        )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
