import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SiteBanner from 'components/site-banner'
import { refreshView } from 'utils'

const Row = ({ todo }) => {
  let iconClass = 'icon'
  if (todo.status.toUpperCase() === 'RELEASED') {
    iconClass += ' icon-ok'
  } else if (todo.status.toUpperCase() === 'IN PROGRESS') {
    iconClass += ' icon-circle'
  }
  return (
    <tr>
      <td className="graphic-cell">
        <i className={iconClass} aria-hidden="true"></i>
      </td>
      <td className="widerow text-cell">{todo.name}</td>
    </tr>
  )
}

const Column = ({ phase, todos }) => {
  return (
    <div className="width-third">
      <table>
        <thead>
          <tr>
            <th colSpan="2">{phase}</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.map(todo => <Row key={todo.name} todo={todo}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default class Roadmap extends React.Component {

  componentDidMount() {
    refreshView()
  }

  getOverviewHTML() {
    return {
      __html: this.props.overview
    }
  }

  get overview() {
    return (
      <div className="indented roadmap-overview">
        <h3>Overview</h3>
        {Array.isArray(this.props.overview) && this.props.overview.map(paragraph => {
          return (
            <p dangerouslySetInnerHTML={this.getOverviewHTML()}></p>
          )
        })}
      </div>
    )
  }

  render() {
    return (
    <div className="roadmap-general">
      <SiteBanner title='Roadmap' />
      <div className="indented">
        <ul className="breadcrumbs">
          <li><Link to='/'>Home</Link></li>
          <li>Roadmap</li>
        </ul>
      </div>


      {this.overview}

      <div className="indented roadmap-table-title">
        <h3>Roadmap</h3>
      </div>

      <div className="indented roadmap-table">
        <Column name='Near-term' todos={this.props.near}/>
        <Column name='Mid-term' todos={this.props.mid}/>
        <Column name='Long-term' todos={this.props.long}/>
      </div>

      <div className="indented roadmap-legend">
        <div className="width-third">
          <table>
            <thead></thead>
              <tbody>
                <tr>
                  <td className="pull-down"><i className="icon icon-ok" aria-hidden="true"></i></td>
                  <td className="widerow pull-down">Released</td>
                </tr>
                <tr>
                  <td className="push-up"><i className="icon icon-circle" aria-hidden="true"></i></td>
                  <td className="widerow push-up">In Progress</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="indented roadmap-disclaimer">
        <h3>Disclaimer</h3>
        <p>{this.props.disclaimer}</p>
      </div>

    </div>
    )
  }
}
