import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class PrivacyPolicy extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    document.activeElement.blur()
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