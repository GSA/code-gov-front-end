import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Footer extends Component {

  render() {
    return (
      <footer className={this.props.color} role="contentinfo">
        <div className="footer-content">
          <div className="footer-part links">
            <ul>
              {this.props.links && this.props.links.map(link => {
                return (
                  <li key={link.name}>
                    <Link to={link.url} className="link">
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="footer-part logos">
            <ul>
              {this.props.logos && this.props.logos.map(logo => {
                return (
                  <li key={logo.name}>
                    <a href={logo.url} target="_blank" rel="noopener">
                      <img src={logo.image} alt={logo.name}/>
                      <span>{logo.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}
