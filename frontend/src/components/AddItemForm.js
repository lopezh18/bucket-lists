import React, { Component } from 'react';
import BucketListApi from '../BucketListApi';
import AutoCompleteText from './AutoCompleteText'
import countries from '../countries';

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      activity: '',
      type: 'activity'
    }
  }

  handleChange = (evt, data=null) => {
    if(evt.target.name === 'type'){
      this.setState({
        type: evt.target.value
      })
    }

    if (this.state.type === 'activity') {
      this.setState({
        [evt.target.name]: evt.target.value
      });
    } else {
      this.setState({
        location: data
      })
    }
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const username = localStorage.getItem('bl-username')
    let { activity, location } = this.state
    if (this.state.type === 'activity') {
      let newActivity = await BucketListApi.addActivity(username, activity);
      this.props.submit('activity', newActivity);
    }

    if (this.state.type === 'location') {
      let newLocation = await BucketListApi.addLocation(username, location);
      this.props.submit('location', newLocation);
    }
    this.setState({ location: '', activity: '' });
  }

  render() {
    let input = (
      <div className='form-group mt-3 itemForm-input'>
        <input
          name='activity'
          className='form-control-auto'
          value={this.state.activity}
          onChange={this.handleChange} />
      </div>
    )

    if (this.state.type === 'location') {
      input = (
        <AutoCompleteText apiForm={this.handleChange} items={countries} />
      )
    }

    return (
      <form autoComplete='off' className='add-item-form' onSubmit={this.handleSubmit}>
        <label>
          <div className='form-group'>
            <label htmlFor='type' className='mx-2'> Select a category to add to: </label>
            <br></br>
            <select 
            onChange={this.handleChange} 
            type='select' 
            name='type'>
              <option name='type' value='activity'> Activity </option>
              <option name='type' value='location'> Location </option>
            </select>
            {input}
          </div>
        </label>
        <button className='btn btn-primary add-item-button'>Submit</button>
      </form>
    )
  }
}

export default AddItemForm;