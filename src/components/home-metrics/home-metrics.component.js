import React, { Component } from 'react'

export default class HomeMetrics extends Component {
  render() {
    return (
      <div className="grid-row">
        <section id="metrics" className="metrics usa-section">
          <h2 className="text-primary">Federal Source Code Metrics</h2>
          <h3>Last updated: 6/1/2020</h3>

          <div className="metrics-box grid-row tablet:border-bottom-2px tablet:border-top-2px">
            <ul>
              <li>Agencies: 26</li>
              <li>Repositories: 7,911</li>
              <li>Forks: 51,612</li>
              <li>Stars & watchers: 113,741</li>
              <li>Open issues: 38,566</li>
              <li>Open source software: 0%</li>
              <li>Government-wide reuse: 0%</li>
            </ul>
          </div>

          <h3>*Data collected through GitHub API.</h3>
        </section>
      </div>
    )
  }
}
