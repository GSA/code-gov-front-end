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
      <main id="main-content">
        <SiteBanner title="Privacy Policy" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'Privacy Policy' }]} />
        <div className="grid-container margin-top-1">
          <div dangerouslySetInnerHTML={{ __html: this.props.privacyPolicy }} />
        </div>
      </main>
    )
  }
}
