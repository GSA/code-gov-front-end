/* global fetch */
import React, { Component } from 'react'

export default class LazyContent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Child: null
    }
  }

  componentDidMount() {
    this.props.load().then(result => {
      this.setState({ Child: result.default })
    })
  }

  render() {
    const { Child } = this.state
    if (Child) {
      return <Child />
    }
  }
}