import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { refreshView } from 'utils'
import SiteBanner from 'components/site-banner'

export default class PrivacyPolicy extends React.Component {

  componentDidMount() {
    refreshView()
  }

  render() {
    return (
      <div style={{background: 'white'}}>
        <SiteBanner title="Privacy Policy" />
        <div className="indented markdown privacy-content">
          <br/>
          <br/>
          <div className="width-three-quarters" dangerouslySetInnerHTML={{ __html: this.props.privacyPolicy }}></div>
        </div>
      </div>
    )
  }
}
