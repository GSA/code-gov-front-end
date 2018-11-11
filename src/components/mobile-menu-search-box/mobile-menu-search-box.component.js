import React from 'react'

export default class MobileMenuSearchBoxComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value)
    event.preventDefault()
    this.setState({ value: ''})
  }

  render() {
    return (
      <form className="search-form" onSubmit={::this.handleSubmit}>
        <input placeholder='Search Projects...' onChange={::this.handleChange} value={this.state.value}/>
        <button className="go">Go</button>
      </form>
    )
  }
}
