import React, { Component } from 'react'

export default class HomeNews extends Component {
  render() {
    return (
      <section className="news">
        <h2>Open Source News & Events</h2>
        <ul>
          {this.props.newsItems &&
            this.props.newsItems.map(news => (
              <li className="news-item" key={news.title}>
                <div className="news-content">
                  <h1>
                    <a href={news.url}>{news.title}</a>
                  </h1>
                  <p>{news.description}</p>
                  <time>{news.date}</time>
                </div>
                <div>
                  <picture className="news-image">
                    <source srcSet={news.image} media="min-width: 800px" />
                    <img src={news.image} alt={news.alt} className="news-image" />
                  </picture>
                </div>
              </li>
            ))}
        </ul>
      </section>
    )
  }
}
