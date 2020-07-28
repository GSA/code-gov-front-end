import { getText } from 'utils/other'
import React, { Component } from 'react'
import ReactPlaceholder from 'react-placeholder'

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

      getText(this.props.url).then(html => {
        if (this.mounted) {
          this.setState({ html, loaded: true })
        }
      })
    }
  }

  componentDidUpdate() {
    if (this.props.onUpdate) {
      this.props.onUpdate()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <ReactPlaceholder type="text" showLoadingAnimation rows={20} ready={this.state.loaded}>
        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </ReactPlaceholder>
    )
  }
}
