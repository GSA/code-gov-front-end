/* global fetch */
import React, { Component } from 'react'

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
      fetch(this.props.url)
        .then(response => response.text())
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