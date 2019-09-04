import React from 'react'
import CustomLink from 'components/custom-link'

export default class HomeAbout extends React.Component {
  render() {
    return (
      <section id="about" className="about .tablet:grid-col-6">
        <header>
          <h2>About Code.gov</h2>
          <p>{this.props.aboutus}</p>
        </header>
        <ul className="about-actions">
          <li>
            <h3>Vision</h3>
            <span className="about-icon">
              <p>{this.props.vision}</p>
              <img alt="" className="" src={`${PUBLIC_PATH}assets/img/icons/vision_icon_sm.png`} />
            </span>
          </li>
          <li>
            <h3>Mission</h3>
            <span className="about-icon">
              <p>{this.props.mission}</p>
              <img alt="" className="" src={`${PUBLIC_PATH}assets/img/icons/mission_icon_sm.png`} />
            </span>
          </li>
        </ul>
      </section>
    )
  }
}
