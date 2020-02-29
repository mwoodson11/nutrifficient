import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import "bootstrap/dist/css/bootstrap.min.css";
import history from './history';
import App from './App';
import Homepage from './Homepage';

class LoginBox extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      // response: [],
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
    let error = validate(this.state.username, this.state.password);
    if (error.length != 0) {
      this.setState({errors: error});
      return;
    }

    const loginUser = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log("Login User");
    console.log(loginUser);

    axios.get('http://localhost:5000/users/login/' + loginUser.username + '/' + loginUser.password, loginUser)
    .then(res => {
      console.log("Response Data")
      console.log(res.data)
      // this.setState({response: res.data})
      if (res.data.length == 0) {
        let error = ["User/Password combination not found. Please try again."];
        console.log("Error")
        console.log(error)
        this.setState({
          username: '',
          password: '',
          // response: [],
          errors: error
        })
        return;
      }
    
      ReactDOM.render(
        <App isLoggedIn = {true} />,
        document.getElementById('root')
      );
      });
      // console.log("State Response");
      // console.log(this.state.response);
  }

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">
          <form>
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
  var error = '';
  // verify username/passcode

  if (username == '') {
    error = 'Please write a username';
    console.log(error);
    errors.push(error);
  } 

  if (password == '') {
    error = 'Please write a password';
    console.log(error);
    errors.push(error);
  }

  return errors;
}

export default LoginBox