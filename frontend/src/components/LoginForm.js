import React, { Component } from 'react';
import BucketListApi from '../BucketListApi';
import './stylesheets/login.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    let res = await BucketListApi.loginUser(this.state);
    if (!res.error) {
      localStorage.setItem('token', res.token)
      localStorage.setItem('bl-username', this.state.username)
      this.props.handleLogin(true, this.state.username);
      this.props.history.push('/');
    } else {
      this.setState({
        hasError: true
      })
    }
  }

  render() {
    let { username, password } = this.state
    let error = (
      <div className="alert alert-warning login-error" role="alert">
        incorrect username or password
      </div>
    )
    return (
      <div className='login-image'>
        <div className='container login-container'>
          <div className='card login-card'>
            <form className='card-body login m-3' onSubmit={this.handleSubmit}>
              <h3 className='card-title mb-4'> Login</h3>
              <div className='form-group'>
                {this.state.hasError ? error : null}
                <label htmlFor='username' className='mx-2 login-labels'> Username: </label>
                <input onChange={this.handleChange} name='username' placeholder='Enter your username' className='form-control border-0 login-inputs text-dark' value={username} />
              </div>
              <div className='form-group'>
                <label className='mx-2 login-labels'>Password: </label>
                <input className='form-control border-0 login-inputs' placeholder='Enter you password' type='password' onChange={this.handleChange} name='password' value={password} />
              </div>
              <button className='btn btn-primary ml-2'>
                Submit
          </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm