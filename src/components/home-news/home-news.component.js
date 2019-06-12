import React, { Component } from 'react'



export default class HomeNews extends Component {
 
  render() {
    return (
      <section className="featured-projects width-half">
        <div id="featured-projects-title">
          <div className="indented">
            <h2>Open Source News & Events</h2>
          </div>
        </div>
        <ul>
          
          {this.props.news && this.props.news.map(news => {
            
            return (
              <li key={news.title}>
                <h3>{news.title}</h3>
                <p>{news.description}</p>
                <time>{news.date}</time>
                <picture>
                  <source 
                    srcSet={news.image}
                    media="min-width: 800px" />
                  <img 
                    src={news.image}
                    alt={news.alt}
                    className="news-image" />
                </picture>
              </li>
            )
        
          })}
       
        </ul>

      </section>
    )
  }
}
