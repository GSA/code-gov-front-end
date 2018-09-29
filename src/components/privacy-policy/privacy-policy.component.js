import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { refreshView } from 'utils'

export default class PrivacyPolicy extends React.Component {

  componentDidMount() {
    refreshView()
  }

  getPrivacyPolicyHTML() {
    return {
      __html: this.props.privacyPolicy
    }
  }

  render() {
    return (
      <div class="indented markdown privacy-content">
        <br/>
        <br/>
        <div class="width-three-quarters" dangerouslySetInnerHTML={this.getPrivacyPolicyHTML()}></div>
      </div>
    )
  }
}