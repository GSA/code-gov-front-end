import React from 'react'
import Breadcrumbs from 'components/breadcrumbs'
import SiteBanner from 'components/site-banner'
import { normalize, refreshView } from 'utils/other'
import { map } from '@code.gov/cautious'

export const Row = ({ todo }) => {
  let iconClass = 'icon'
  const status = normalize(todo.status)
  if (status === 'released') {
    iconClass += ' icon-ok text-green'
  } else if (status === 'in progress') {
    iconClass += ' icon-circle text-accent-warm-light'
  }
  return (
    <tr>
      <td className="padding-y-1 padding-x-1">
        <i className={iconClass} aria-hidden="true" />
      </td>
      <td className="padding-y-1 padding-x-1">{todo.name}</td>
    </tr>
  )
}

export const Column = ({ phase, todos }) => (
  <div className="tablet:grid-col">
    <table className="roadmap border-solid border-width-1px border-base-lighter radius-lg">
      <thead className="bg-secondary-light border-solid border-width-1px border-secondary-light text-white">
        <tr>
          <th colSpan="2" className="padding-y-2 border-solid border-width-1px border-secondary-light radius-top-lg">{phase}</th>
        </tr>
      </thead>
      <tbody>
        {map(todos, todo => (
          <Row key={todo.name} todo={todo} />
        ))}
      </tbody>
    </table>
  </div>
)

export default class Roadmap extends React.Component {
  componentDidMount() {
    refreshView()
  }

  get overview() {
    return (
      <div>
        <h3 className="font-heading-lg text-bold">Overview</h3>
        {map(this.props.overview, paragraph => (
          <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div>
        <SiteBanner title="Roadmap" />
        <div className="grid-container">
          <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Roadmap' }]} />

          {this.overview}

          <div>
            <h3 className="margin-top-4 font-heading-lg text-bold">Roadmap</h3>
          </div>

          <div className="grid-row grid-gap">
            <Column phase="Near-term" todos={this.props.near} />
            <Column phase="Mid-term" todos={this.props.mid} />
            <Column phase="Long-term" todos={this.props.long} />
          </div>

          <div className="">
            <div className="">
              <table className="grid-row">
                <thead />
                <tbody>
                  <tr>
                    <td className="">
                      <i className="icon icon-ok text-green" aria-hidden="true" />
                    </td>
                    <td className="">Released</td>
                  </tr>
                  <tr>
                    <td className="">
                      <i className="icon icon-circle text-accent-warm-light" aria-hidden="true" />
                    </td>
                    <td className="">In Progress</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="margin-y-3">
            <h3 className="font-heading-lg text-bold">Disclaimer</h3>
            <p>{this.props.disclaimer}</p>
          </div>
        </div>
      </div>
    )
  }
}
