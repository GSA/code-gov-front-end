import React, { Fragment } from 'react'
import { refreshView } from 'utils/other'
import Breadcrumbs from 'components/breadcrumbs'
import SiteBanner from 'components/site-banner'

export default class PrivacyPolicy extends React.Component {
  componentDidMount() {
    refreshView()
  }

  render() {
    return (
      <div style={{ background: 'white' }}>
        <SiteBanner title="Privacy Policy" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Privacy Policy' }]} />
        <div className="indented markdown privacy-content">
          <br />
          <br />
          <div
            className="width-three-quarters"
            dangerouslySetInnerHTML={{ __html: this.props.privacyPolicy }}
          />
        </div>
      </div>
    )
  }
}
