import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.state = {
      errors: [],
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }
  
  onChangePassword2(e) {
    this.setState({password2: e.target.value});
  }

  submitRegister(e) {
    e.preventDefault();
    const errors = validate(this.state.username, this.state.email, this.state.password, this.state.password2);
    if (errors.length != 0) {
      this.setState({errors});
      return;
    }

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      height: 0,
      weight: 0,
      gender: 0
    };
    console.log(newUser);
    axios.post('http://localhost:5000/users/add', newUser)
    .then(res => console.log(res.data));
    
    this.setState({
      username: '',
      email: '',
      password: '',
      height: 0,
      weight: 0,
      gender: 0
    })
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
                  <input type="text"
                    required
                    name="username"
                    className="login-input"
                    placeholder="Username"
                    value = {this.state.username}
                    onChange = {this.onChangeUsername}
                    />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="text" 
                required
                name="email" 
                className="login-input" 
                placeholder="Email"
                value = {this.state.email}
                onChange = {this.onChangeEmail}/>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                value = {this.state.password}
                onChange = {this.onChangePassword}/>
            </div>

            <div className="input-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password2"
                name="password2"
                className="login-input"
                placeholder="Password"
                value = {this.state.password2}
                onChange = {this.onChangePassword2}/>
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={this
              .submitRegister
              .bind(this)}>Register</button>
           </form>
        </div>
      </div>
    );
  }
}

function validate(username, email, password, password2) {
  const errors = [];
  if (username.length == 0) {
    errors.push("Name cannot be empty");
  }
  if (email.split("").filter(x => x === "@").length !== 1) {
    errors.push("Email should contain an @");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot.");
  }
  if (password != password2) {
    errors.push("Passwords must be equal");
  }
  return errors;
}

export default RegisterBox