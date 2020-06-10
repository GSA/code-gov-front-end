import React from 'react'
import { refreshView } from 'utils/other'
import Breadcrumbs from 'components/breadcrumbs'
import SiteBanner from 'components/site-banner'

export default class PrivacyPolicy extends React.Component {
  componentDidMount() {
    refreshView()
  }

  render() {
    return (
      <div>
        <SiteBanner title="Privacy Policy" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Privacy Policy' }]} />
        <div className="grid-container">
          <br />
          <div dangerouslySetInnerHTML={{ __html: this.props.privacyPolicy }} />
        </div>
      </div>
    )
  }
}
