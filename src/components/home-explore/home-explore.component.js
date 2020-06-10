import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'

export default class HomeExplore extends React.Component {
  render() {
    return (
      <div className="grid-row">
        <section id="explore" className="explore usa-section">
          <div className="explore-actions grid-row text-center tablet:border-bottom-2px tablet:border-top-2px padding-top-205 padding-bottom-205">
            {this.props.exploreItems &&
              this.props.exploreItems.map(item => (
                <div
                  className="explore-action grid-row flex-column flex-justify  padding-right-2 padding-left-2 tablet:grid-col-4 tablet:border-right-2px"
                  key={item.title}
                >
                  <div>
                    <h2 className="text-primary">{item.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  </div>
                  <div className="buttons">
                    {item.links.map(link => (
                      <span key={link.name}>
                        <a href={link.url}>
                          <button className="usa-button">{link.name}</button>
                        </a>
                      </span>
                    ))}
                  </div>
                  <div className="height-6 show-w-lte-600" />
                </div>
              ))}
          </div>
        </section>
      </div>
    )
  }
}
