import React from 'react'
import CustomLink from 'components/custom-link'

export default class HomeAbout extends React.Component {

  render() {
    return (
      <section id="about" className="about">
        <header>
          <h2>Our Mission</h2>
          <p className="indented">{this.props.mission}</p>
        </header>
        <br />
        <hr />
        <ul className="indented about-actions">
          {this.props.aboutItems && this.props.aboutItems.map(item => {
            return (
              <li className="about-action width-third" key={item.title}>
                <CustomLink to={item.link}>
                  <img alt="About Icon" src={item.image}/>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </CustomLink>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}
