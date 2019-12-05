import React, { Component } from 'react'

export default class HomeNews extends Component {
  render() {
    return (
      <section className="bg-primary-lighter news tablet:grid-col-6">
        <header className="padding-x-4  padding-top-6">
          <h2 className="font-heading-l text-primary text-center">Open Source News & Events</h2>
        </header>
        <ul className="padding-x-1">
          {this.props.newsItems &&
            this.props.newsItems.map(news => (
              <li className="bg-white grid-row margin-1 padding-2" key={news.title}>
                <div className="flex-1">
                  <h3 className="font-heading-sm text-bold">
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                      {news.title}
                    </a>
                  </h3>
                  <p>{news.description}</p>
                  <time>{news.date}</time>
                </div>
                <picture className="order-first padding-right-2">
                  <source srcSet={news.image} media="min-width: 800px" />
                  <img src={news.image} alt={news.alt} className="maxw-15 margin-right-1" />
                </picture>
              </li>
            ))}
        </ul>
      </section>
    )
  }
}
