import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './stylesheets/navbar.css'

class NavBar extends Component {
  render() {
    let navToRender = (
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <NavLink exact to='/locations' className="nav-item nav-link" id='locations'> Locations </NavLink>
          <NavLink exact to='/activities' className="nav-item nav-link" id='activities'> Activities </NavLink>
          <NavLink exact to='/logout' className="nav-item nav-link" id='logout'onClick={() => {
            this.props.updateUser(false)
            localStorage.clear()
          }}> Logout </NavLink>
        </div>
      </div>
    )

    let status = this.props.user.loggedIn
    if (!status) {
      navToRender = (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <NavLink exact to='/login' className="nav-item nav-link" id='login'> Login </NavLink>
            <NavLink exact to='/signup' className="nav-item nav-link" id='signup' > Sign Up </NavLink>
          </div>
        </div>
      )
    }
    
    return (
      <nav className='navbar navbar-expand-lg navbar-dark'>
        <NavLink exact to='/' className="navbar-brand">Bucket List</NavLink>
        <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" 
        aria-label="Toggle navigation">
          <span><i className="fas fa-bars"></i></span>
        </button>
        {navToRender}
      </nav>
    )
  }
}

export default NavBar;