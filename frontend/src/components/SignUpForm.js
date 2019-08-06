import React, { Component } from 'react'
import BucketListApi from '../BucketListApi';
import './stylesheets/signup.css'

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      homeAirport: '',
      hasError: false
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    let res = await BucketListApi.registerUser(this.state);
    if (!res.error) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('bl-username', this.state.username);
      this.props.handleLogin(true, this.state.username);
      this.props.history.push('/');
    } else {
      this.setState({
        hasError: true
      })
    }
  }

  render() {
    let notice = (
      <div className="alert alert-warning registration-error m-0" role="alert">
        please complete all fields
      </div>
    )

    if(!this.state.hasError){
      notice= (<small className='card-text'>All fields are required</small>)
    }
    let { firstName, lastName, username, password, email, homeAirport } = this.state

    return (
      <div className='signup-image'>
        <div className='container signup-container'>
          <div className='card registration-card'>
            <form className='card-body signup m-3' onSubmit={this.handleSubmit}>
              <div className='mb-3'>
                <h3 className='card-title m-0'>Create your account!</h3>
                {notice}
              </div>
              <div className='form-group'>
                <label htmlFor='firstName' className='mx-2 signup-labels'> First Name: </label>
                <input placeholder='Enter your first name' onChange={this.handleChange} name='firstName' className='form-control signup-inputs border-0' value={firstName} />
              </div>
              <div className='form-group'>
                <label htmlFor='lastName' className='mx-2 signup-labels'> Last Name: </label>
                <input placeholder='Enter your last name' onChange={this.handleChange} name='lastName' className='form-control signup-inputs border-0' value={lastName} />
              </div>

              <div className='form-group'>
                <label htmlFor='email' className='mx-2 signup-labels'> Email: </label>
                <input placeholder='Enter your email' onChange={this.handleChange} name='email' className='form-control signup-inputs border-0' value={email} />
                <small className="form-text text-dark" >We'll never share your email with anyone else. </small>
              </div>
              <div className='form-group'>
                <label htmlFor='username' className='mx-2 signup-labels'> Username: </label>
                <input placeholder='Enter desired username' onChange={this.handleChange} name='username' className='form-control signup-inputs border-0' value={username} />
              </div>
              <div className='form-group'>
                <label className='mx-2 signup-labels'> Home Airport: </label>
                <input placeholder='Enter your 3 letter airport code' className='form-control signup-inputs border-0'
                onChange={this.handleChange} name='homeAirport' value={homeAirport} />
              </div>
              <div className='form-group'>
                <label className='mx-2 signup-labels'>Password: </label>
                <input placeholder='Enter password' className='form-control signup-inputs border-0' type='password' onChange={this.handleChange} name='password' value={password} />
              </div>
              <button className='btn-lg btn-primary ml-2'>
                Submit
          </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpForm;
