import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'

export default class HomeExplore extends React.Component {

  render() {
    return (
      <section id="about" className="about">
        <ul className="indented about-actions">
          {this.props.explore && this.props.explore.map(item => {
            return (
              <li className="about-action width-third" key={item.title}>
    
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="buttons">
                  {item.links.map(link => {
                    if (link.url.startsWith('http')) {
                      (
                        <span key={link.url}>
                          <a href={link.url}>
                            <button className="alt">{link.name}</button>
                          </a>
                        </span>
                      )
                    } else {
                      (
                        <span key={link.url}>
                          <CustomLink to={link.url}>
                            <button className="alt">{link.name}</button>
                          </CustomLink>
                        </span>
                      )
                    }
                    
                  })}
              </div>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}
