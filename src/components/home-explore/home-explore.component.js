import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'

export default class HomeExplore extends React.Component {
  render() {
    return (
      <section id="explore" className="explore">
        <ul className="explore-actions grid-row">
          {this.props.exploreItems &&
            this.props.exploreItems.map(item => (
              <li className="explore-action .tablet:grid-col-4" key={item.title}>
                <div>
                  <h2>{item.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
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
