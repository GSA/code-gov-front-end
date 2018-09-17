import React, { Fragment } from 'react'
import HomeBanner from '../home-banner'
import './home.scss'

export default class HomeComponent extends React.Component {

  render() {
    return (
      <Fragment>
        <HomeBanner/>
        <div>Home</div>
      </Fragment>
    )
/*    return (
      
        <div></div>
      </Fragment>
    )
  */
  }

}