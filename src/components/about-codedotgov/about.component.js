import React from 'react'
import { refreshView } from 'utils/other'
import Breadcrumbs from 'components/breadcrumbs'
import SiteBanner from 'components/site-banner'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/about-codedotgov/html/`

export default class AboutCodeDotGov extends React.Component {
  componentDidMount() {
    refreshView()
  }

  render() {
    return (
      <div id="main-content">
        <SiteBanner title="About" />
        <Breadcrumbs crumbs={[{ text: 'Home', to: '/' }, { text: 'About' }]} />
        <div className="grid-container margin-top-1">
          <LazyHTML url={`${dataurl}overview/introduction.html`} />
        </div>
      </div>
    )
  }
}
