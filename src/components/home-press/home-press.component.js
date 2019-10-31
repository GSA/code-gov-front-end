import React, { Component } from 'react'
import { map } from '@code.gov/cautious'

export default class HomePressComponent extends Component {
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
                    <a href={this.props.attributionUrl}>
                      <img className="press-logo" src={this.props.attributionImage} alt="Wired" />
                    </a>
                  </div>
                </div>
                <div>
                  <hr />
                  <ul className="press-links">
                    {map(this.props.links, ({ image, url, alt }) => (
                      <li key={alt}>
                        <a href={url}>
                          <img className="press-logo" src={image} alt={alt} />
                        </a>
                      </li>
                    ))}
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
