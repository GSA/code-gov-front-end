import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'

export default class HomeExplore extends React.Component {
  render() {
    return (
      <section id="explore" className="explore">
        <ul className="explore-actions">
          {this.props.explore &&
            this.props.explore.map(item => (
              <li className="explore-action" key={item.title}>
                <h2>{item.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
                <div className="buttons">
                  {item.links.map(link => (
                    <span key={link.name}>
                      <a href={link.url}>
                        <button className="alt">{link.name}</button>
                      </a>
                    </span>
                  ))}
                </div>
              </li>
            ))}
        </ul>
      </section>
    )
  }
}
