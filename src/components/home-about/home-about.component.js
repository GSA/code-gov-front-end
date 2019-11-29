import React from 'react'
import CustomLink from 'components/custom-link'

export default class HomeAbout extends React.Component {
  render() {
    return (
      <section id="about" className="bg-primary-lighter padding-top-6 tablet:grid-col-6">
        <header className="padding-x-4">
          <h3 className="text-primary text-center">About Code.gov</h3>
          <p>{this.props.aboutus}</p>
        </header>
        <ul className="padding-x-4">
          <li>
            <h2 className="text-primary text-uppercase margin-left-8 margin-bottom-0">Vision</h2>
            <span className="display-flex tablet:flex-row">
              <p className="">{this.props.vision}</p>
              <img alt="" className="order-first height-7 margin-top-2 margin-right-2" src={`${PUBLIC_PATH}assets/img/icons/vision_icon_sm.png`} />
            </span>
          </li>
          <li>
            <h2 className="text-primary text-uppercase margin-left-8 margin-bottom-0">Mission</h2>
            <span className="display-flex about-icon">
              <p>{this.props.mission}</p>
              <img alt="" className="order-first height-7 margin-top-2 margin-right-2" src={`${PUBLIC_PATH}assets/img/icons/mission_icon_sm.png`} />
            </span>
          </li>
        </ul>
      </section>
    )
  }
}
