import React, { Component } from 'react'
import { getText } from 'utils/other'

export default class LazyHTML extends Component {

  constructor(props) {
    super(props)
    this.loading = false
    this.mounted = false
    this.state = { html: '<h1>LOADING</h1>' }
  }

  componentDidMount() {
    this.mounted = true
    if (!this.loading) {
      this.loading = true
      getText(this.props.url)
        .then(html => {
          if (this.mounted) {
            this.setState({ html })
          }
        })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
  }
}