import React, { Fragment } from 'react'
import HomeBanner from '../home-banner'

export default class HomeComponent extends React.Component {
  render() {
    return (
      <Fragment>
        <HomeBanner />
        <div></div>
      </Fragment>
    )
  }
}