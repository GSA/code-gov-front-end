import React from 'react'
import Breadcrumbs from 'components/breadcrumbs'
import SiteBanner from 'components/site-banner'
import { normalize, refreshView } from 'utils/other'
import { map } from '@code.gov/cautious'

export const Row = ({ todo }) => {
  let iconClass = 'icon'
  let taskStatus = ''
  const status = normalize(todo.status)
  if (status === 'released') {
    iconClass += ' icon-ok text-green'
    taskStatus = 'released'
  } else if (status === 'in progress') {
    iconClass += ' icon-circle text-accent-warm-light'
    taskStatus = 'in progress'
  } else {
    taskStatus = 'no status'
  }

  return (
    <li className="margin-bottom-0">
      <div className="grid-row">
        <div className="grid-col-1 padding-top-1 padding-left-2">
          <i className={iconClass} aria-label={taskStatus} />
        </div>
        <div className="grid-col-11 padding-y-1 padding-x-1 font-body-3xs text-base-dark padding-left-3">
          {todo.name}
        </div>
      </div>
    </li>
  )
}

export const Column = ({ phase, todos }) => (
  <div className="tablet:grid-col">
    <div>
      <h3 className="bg-base-lighter padding-y-2 text-center text-bold text-base-darker border-base-lighter font-body-md radius-top-lg border-1px border-bottom-0">
        {phase}
      </h3>
      <ul className="radius-bottom-lg margin-top-0 padding-y-1 padding-x-05 border-1px border-top-0 border-base-lighter">
        {map(todos, todo => (
          <Row key={todo.name} todo={todo} />
        ))}
      </ul>
    </div>
  </div>
)

export default class Roadmap extends React.Component {
  componentDidMount() {
    refreshView()
  }

  get overview() {
    return (
      <div className="margin-top-1">
        <h2>Overview</h2>
        {map(this.props.overview, paragraph => (
          <p
            className="maxw-none"
            key={paragraph}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    )
  }

  render() {
    return (
      <main id="main-content">
        <SiteBanner title="Roadmap" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Roadmap' }]} />

        <div className="grid-container">
          {this.overview}

          <div>
            <h2 className="margin-top-4">Roadmap</h2>
          </div>

          <section className="grid-container padding-0">
            <div className="grid-row grid-gap padding-top-3">
              <Column phase="Near-term" todos={this.props.near} />
              <Column phase="Mid-term" todos={this.props.mid} />
              <Column phase="Long-term" todos={this.props.long} />
            </div>
          </section>

          <section
            className="grid-container margin-top-205 margin-bottom-5 padding-0"
            aria-hidden="true"
          >
            <div className="grid-row border-0 padding-bottom-0">
              <i className="icon icon-ok text-green" />
              <span className="border-0 font-body-3xs padding-left-1 padding-bottom-0 text-base-dark padding-top-1px">
                Released
              </span>
            </div>
            <div className="grid-row border-0 padding-top-1">
              <i className="icon icon-circle text-accent-warm-light" />
              <span className="border-0 font-body-3xs padding-left-1 text-base-dark padding-top-1px">
                In Progress
              </span>
            </div>
          </section>

          <div className="margin-y-3">
            <h2>Disclaimer</h2>
            <p className="maxw-none">{this.props.disclaimer}</p>
          </div>
        </div>
      </main>
    )
  }
}
