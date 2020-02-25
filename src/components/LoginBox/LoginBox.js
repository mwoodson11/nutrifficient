import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import "bootstrap/dist/css/bootstrap.min.css";
import history from '../../history';
import App from '../App/App';
import Homepage from '../Homepage/Homepage';

class LoginBox extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const errors = validate(this.state.username, this.state.password);
    if (errors.length != 0) {
      this.setState({errors});
      return;

    }
  
    ReactDOM.render(
      <App isLoggedIn = {true} />,
      document.getElementById('root')
    );
  }

  render() {
    return (
      <div className="inner-container">
        <div className="box">
          <form onSubmit = {this.onSubmit}>
            {this.state.errors.map(error => (
              <p key={error}>Error: {error}</p>
            ))}
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                name="username"
                className="login-input"
                placeholder="Username"
                value = {this.state.username}
                onChange = {this.onChangeUsername}
                />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                name="password"
                className="login-input"
                placeholder="Password"
                value = {this.state.password}
                onChange = {this.onChangePassword}
                />
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={this
              .onSubmit
              .bind(this)}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(username, password) {
  const errors = [];
  // verify username/passcode



  return errors;
}

export default LoginBox