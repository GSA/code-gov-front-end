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
      <td className="padding-y-1 padding-x-1 border-0">
        <i className={iconClass} aria-hidden="true" />
      </td>
      <td className="padding-y-1 padding-x-1 border-0 font-body-3xs">{todo.name}</td>
    </tr>
  )
}

export const Column = ({ phase, todos }) => (
  <div className="tablet:grid-col">
    <div>
      <h3 className="bg-cyan padding-y-2 text-center text-bold text-white border-base-lighter font-body-md radius-top-lg border-1px border-bottom-0">
        {phase}
      </h3>
      <div className="radius-bottom-lg margin-top-0 padding-y-1 padding-x-05 border-1px border-top-0 border-base-lighter">
        <tbody>
          {map(todos, todo => (
            <Row key={todo.name} todo={todo} />
          ))}
        </tbody>
      </div>
    </div>
  </div>
)

export default class Roadmap extends React.Component {
  componentDidMount() {
    refreshView()
  }

  get overview() {
    return (
      <div className="margin-top-3">
        <h3 className="font-heading-lg text-bold">Overview</h3>
        {map(this.props.overview, paragraph => (
          <p className="maxw-none" key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div>
        <SiteBanner title="Roadmap" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Roadmap' }]} />

        <div className="grid-container">
          {this.overview}

          <div>
            <h3 className="margin-top-4 font-heading-lg text-bold">Roadmap</h3>
          </div>

          <section className="grid-container padding-0">
            <div className="grid-row grid-gap padding-top-3">
              <Column phase="Near-term" todos={this.props.near} />
              <Column phase="Mid-term" todos={this.props.mid} />
              <Column phase="Long-term" todos={this.props.long} />
            </div>
          </section>

          <div className="">
            <div className="">
              <table className="grid-row">
                <thead />
                <tbody>
                  <tr>
                    <td className="border-0 padding-bottom-0">
                      <i className="icon icon-ok text-green" aria-hidden="true" />
                    </td>
                    <td className="border-0 font-body-3xs padding-left-0 padding-bottom-0">
                      Released
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0 padding-top-05">
                      <i className="icon icon-circle text-accent-warm-light" aria-hidden="true" />
                    </td>
                    <td className="border-0 font-body-3xs padding-left-0 padding-top-05">
                      In Progress
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="margin-y-3">
            <h3 className="font-heading-lg text-bold">Disclaimer</h3>
            <p className="maxw-none">{this.props.disclaimer}</p>
          </div>
        </div>
      </div>
    )
  }
}
