import React, { Component } from 'react'
import HomeFeaturedProject from '../home-featured-project'

export default class HomeFeaturedProjects extends Component {
  /* static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
  } */

  render() {
    return (
      <section className="featured-projects block block--white">
        <div id="featured-projects-title">
          <div className="indented">
            <h2>Featured Projects</h2>
          </div>
        </div>
        <div>
          {this.props.featuredProjects &&
            this.props.featuredProjects.map((project, index) => (
              <HomeFeaturedProject index={index} key={project.short_name} project={project} />
            ))}
        </div>
      </section>
    )
  }
}
