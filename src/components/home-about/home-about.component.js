import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'

export default class HomeAbout extends React.Component {
  render() {
    return (
      <section id="about" className="about">
        <header>
          <h2>About Code.gov</h2>
          <p>{this.props.aboutus}</p>
        </header>
        <ul className="indented about-actions">
          <li>
            <h3>Vision</h3>
            <p>{this.props.vision}</p>
            <i />
          </li>
          <li>
            <h3>Mission</h3>
            <p>{this.props.mission}</p>
            <i />
          </li>
        </ul>
      </section>
    )
  }
}
