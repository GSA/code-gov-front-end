import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SiteBanner from 'components/site-banner'
import { normalize, refreshView } from 'utils/other'
import { map } from '@code.gov/cautious'

const Row = ({ todo }) => {
  let iconClass = 'icon'
  let status = normalize(todo.status)
  if (status === 'released') {
    iconClass += ' icon-ok'
  } else if (status === 'in progress') {
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
        <tbody style={{background: 'white'}}>
          {map(todos, todo => <Row key={todo.name} todo={todo}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default class Roadmap extends React.Component {

  componentDidMount() {
    refreshView()
  }

  get overview() {
    return (
      <div className="indented roadmap-overview">
        <h3>Overview</h3>
        {map(this.props.overview, paragraph => <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }}></p>)}
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
        <Column phase='Near-term' todos={this.props.near}/>
        <Column phase='Mid-term' todos={this.props.mid}/>
        <Column phase='Long-term' todos={this.props.long}/>
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
