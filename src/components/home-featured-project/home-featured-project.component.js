import React, { PureComponent } from 'react'
import CustomLink from 'components/custom-link'

export default class HomeFeaturedProject extends PureComponent {
  render() {
    const { image, alt, short_name, verbose_name, author, description, links } = this.props.project

    const place = this.props.index % 2 === 0 ? 'even' : 'odd'

    const getImage = (
      <div className="width-half">
        <img src={image} alt={alt} />
      </div>
    )
    return (
      <div className="block featured-project">
        <div className="indented">
          {place === 'even' && getImage}

          <div className="width-half">
            <div className="featured-project-info">
              <div className="fp-short-name">{short_name}</div>
              <div className="fp-verbose-name">{verbose_name}</div>
              <div className="fp-developed-by">
                developed by
                {` ${author}`}
              </div>
              <p className="fp-description">{description}</p>
              <div className="buttons">
                {links.map(link => (
                  <span key={link.url}>
                    <CustomLink to={link.url}>
                      <button className="alt">{link.name}</button>
                    </CustomLink>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {place === 'odd' && getImage}
        </div>
      </div>
    )
  }
}
