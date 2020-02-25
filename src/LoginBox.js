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
    
    //return(
     // <Router>
     //   <Route path = "Homepage" component = {Homepage} />
      //  <Redirect to = "/Homepage" />
     // </Router>
    //);
    //store.set('loggedIn', true);
    //this.props.history.push("/App");
    //if no error, go to home page.
  }

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">
          <form>
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