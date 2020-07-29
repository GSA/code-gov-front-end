import React, { Fragment } from 'react'
import CustomLink from 'components/custom-link'
import { startsWith } from '@code.gov/cautious'

function LinkButtons({ name, className, url }) {
  if (startsWith(url, 'http') || startsWith(url, 'mailto')) {
    return (
      <a href={url} className={className} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    )
  }
  return (
    <CustomLink to={url} className={className}>
      {name}
    </CustomLink>
  )
}

export default class HomeExplore extends React.Component {
  render() {
    return (
      <div className="grid-row">
        <section id="explore" className="explore usa-section">
          <div className="explore-actions grid-row text-center tablet:border-bottom-2px tablet:border-top-2px tablet:padding-top-205 padding-top-3 tablet:padding-bottom-205 padding-bottom-0">
            {this.props.exploreItems &&
              this.props.exploreItems.map(item => (
                <div
                  className="explore-action grid-row flex-column flex-justify  padding-right-2 padding-left-2 tablet:grid-col-4 tablet:border-right-2px margin-bottom-5 tablet:margin-bottom-0"
                  key={item.title}
                >
                  <div>
                    <h2 className="text-primary">{item.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  </div>
                  <div className="buttons">
                    {item.links.map(link => (
                      <LinkButtons
                        key={link.name}
                        className="usa-button font-body-sm tablet-lg:padding-x-5 line-height-sans-2"
                        name={link.name}
                        url={link.url}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    )
  }
}
