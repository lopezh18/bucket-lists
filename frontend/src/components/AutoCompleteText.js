import React, { Component } from 'react'
import uuid from 'uuid/v4'
import './stylesheets/autocomplete.css'

class AutoCompleteText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: ''
    };
  }

  handleChange = (e) => {
    const { items } = this.props;
    const value = e.target.value;
    let suggestions = [];
    const regex = new RegExp(`^${value}`, 'i');
    suggestions = items.sort().filter(v => regex.test(v))
    this.setState({ suggestions, text: value })
    this.props.apiForm(e, value)
  }

  renderSuggestions = () => {
    const { suggestions, text } = this.state

    if (!suggestions.length || !text.length) {
      return null;
    }

    return (
      <ul className='countriesList'>
        {suggestions.map(item => <li key={uuid()} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
      </ul>
    )
  }

  suggestionSelected = (value) => {
    this.setState({
      text: value,
      suggestions: []
    })
    this.props.apiForm(null, value)
  }

  render() {
    const { text } = this.state;
    return (
      <div className='form-group mt-3 itemForm-input autocomplete form-control-auto'>
        <input placeholder='Country' className='form-control-auto' value={text} name='locations' onChange={this.handleChange} type='text' />
        {this.renderSuggestions()}
      </div>
    )
  }
}

export default AutoCompleteText;
